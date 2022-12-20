import TcpSocket from "react-native-tcp-socket";
import { Messages } from "@knightsofglory/warlibrary/lib/common/Messages";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { Profile } from "@knightsofglory/warlibrary/lib/state/ProfileManager";
import MessageBuffer from "../utilities/MessageBuffer";
import Socket from "react-native-tcp-socket/lib/types/Socket";

export namespace ConnectionManager {

    let connected = false;
    let client: Socket;

    export function initialize() {
        listen();
    }

    export function send(data: string) {
        if (connected) {
            client.write(data);
        }
    }

    function destroy() {
        if (client) {
            client._connectListener = undefined;
            client._closeListener = undefined;
            client._dataListener = undefined;
            client._errorListener = undefined;
            client.destroy();
        }
    }

    function sendInit6Login(profile: Profile) {
        client.write("C1\x0D\x0A");
        client.write("ACCT " + profile.username + "\x0D\x0A");
        client.write("PASS " + profile.password + "\x0D\x0A");
        client.write("HOME " + profile.home + "\x0D\x0A");
        client.write("LOGIN\x0D\x0A");
    }

    function sendClassicLogin(profile: Profile) {
        client.write("\x03\x04");
        client.write(profile.username + "\x0D\x0A");
        client.write(profile.password.toLowerCase() + "\x0D\x0A");
        client.write("/join " + profile.home + "\x0D\x0A");
    }

    function listen() {
        References.messageBus.on(Messages.Channels.SOCKET, async (command) => {
            switch (command) {
                case Messages.Commands.Socket.CONNECT:
                    let profile = References.profileManager.getProfile();
                    destroy();
                    client = TcpSocket.createConnection({ "host": profile.server, port: 6112 }, () => {
                        if (connected) return
                        if (profile.init6) { // init6
                            sendInit6Login(profile);
                        } else {
                            sendClassicLogin(profile);
                        }
                    });

                    let received = new MessageBuffer("\r\n");

                    // @ts-ignore
                    client.on("data", function(data: string) {
                        received.push(data);
                        while (!received.isFinished()) {
                            const message = received.handleData();
                            References.messageBus.send(Messages.Channels.MESSAGES, message);
                        }
                    });
                    // @ts-ignore
                    client.on("close", () => {
                        if (connected) {
                            connected = false;
                            References.messageBus.send(
                                Messages.Channels.SOCKET,
                                Messages.Commands.Socket.DISCONNECTED,
                            );
                        }
                    });
                    // @ts-ignore
                    client.on("error", (err) => {
                        console.log(err);
                    });
                    // @ts-ignore
                    client.on("connect", () => {
                        if (!connected) {
                            connected = true;
                            References.messageBus.send(
                                Messages.Channels.SOCKET,
                                Messages.Commands.Socket.CONNECTED,
                            );
                        }
                    });
                    break;
                case Messages.Commands.Socket.DISCONNECT:
                    let oldClient = client;
                    client.destroy();
                    setTimeout(() => {
                        oldClient._connectListener = undefined;
                        oldClient._closeListener = undefined;
                        oldClient._dataListener = undefined;
                        oldClient._errorListener = undefined;
                    }, 1000);
                    break;
            }
        });
    }
}

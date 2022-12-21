import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { ChatHelper } from "../utilities/ChatHelper";
import { Channel } from "@knightsofglory/warlibrary/lib/state/ChannelManager";
import { ProfileManager } from "../state/ProfileManager";

export default function() {
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);
    const [channel, setChannel] = useState<Channel>({ name: "", topic: "", users: 0 });

    useEffect(() => {
        References.connectionManager.subscribe(
            "connected",
            (isConnected: boolean) => setConnected(isConnected),
        );
        References.channelManager.subscribe(
            "current",
            (channel: Channel) => setChannel(channel),
        );
    }, []);

    const placeholder = (connected && channel.name != "") ? "Send to #" + channel.name : "";

    return (
        <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            disabled={!connected}
            keyboardAppearance={"dark"}
            right={<TextInput.Icon onPress={() => {
                References.messageBus.send("chat", message)
                if (!message.startsWith("/") && !ProfileManager.getProfile().init6) {
                    References.chatManager.add(ChatHelper.makeSelfChat(message));
                }
                setMessage("");
            }} icon="send" />}
            style={{
                margin: 8,
                marginBottom: 8,
                marginTop: 4,
                backgroundColor: "#121212",
                paddingVertical: 0,
                paddingHorizontal: 12,
                marginVertical: 0,
            }}
            autoCapitalize={"none"}
            autoCorrect={false}
            spellCheck={false}
            mode={"flat"}
            placeholder={placeholder}
            placeholderTextColor={"#424242"}
            outlineColor={"#90caf9"}
            underlineColor={"#121212"}
            dense
        />
    );
}

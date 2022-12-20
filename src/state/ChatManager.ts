import {Messages} from "@knightsofglory/warlibrary/lib/common/Messages";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { ConnectionManager } from "./ConnectionManager";

export namespace ChatManager {

  export function initialize() {
    listen();
  }

  function listen() {
    References.messageBus.on(Messages.Channels.CHAT, async (arg) => {
      ConnectionManager.send(arg as string);
      ConnectionManager.send('\x0D\x0A');
    });
  }
}

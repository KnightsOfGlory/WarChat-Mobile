import { References } from "@knightsofglory/warlibrary/lib/References";
import { Messages } from "@knightsofglory/warlibrary/lib/common/Messages";
import { Profile } from "@knightsofglory/warlibrary/lib/state/ProfileManager";

export namespace ProfileManager {

  export function initialize() {
    listen()
    push()
  }

  function listen() {
    References.messageBus.on(Messages.Channels.PROFILE, (command, profile) => {
      switch (command) {
        case Messages.Commands.Profile.READ:
          if (profile) return
          push()
          break
      }
    })
  }

  function push() {
    let profile: Profile = {
      home: "Clan [vL]",
      init6: true,
      password: "",
      server: "ash.wserv.org",
      username: "WarChat-Mobile"
    }

    References.messageBus.send(
      Messages.Channels.PROFILE,
      Messages.Commands.Profile.READ,
      profile
    )
  }
}

import { References } from "@knightsofglory/warlibrary/lib/References";
import { Messages } from "@knightsofglory/warlibrary/lib/common/Messages";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Profile = {
    server: string,
    username: string,
    password: string,
    home: string,
    init6: boolean
}

export namespace ProfileManager {

    const empty = {
        server: "",
        username: "",
        password: "",
        home: "",
        init6: true
    }
    const key = "@profile"
    let profile: Profile = empty

    export function initialize() {
        load().then(() => {
            listen()
            push()
        })
    }

    export function getProfile() {
        return { ...empty, ...profile }
    }

    async function load() {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                profile = JSON.parse(value) as Profile
            } else {
                return
            }
        } catch (err) { console.log(err) }
    }

    async function save() {
        try {
            let data = JSON.stringify(profile)
            await AsyncStorage.setItem(key, data)
        } catch (err) { console.log(err) }
    }

    function push() {
        References.messageBus.send(
            Messages.Channels.PROFILE,
            Messages.Commands.Profile.READ,
            profile
        )
    }

    function listen() {
        References.messageBus.on(Messages.Channels.PROFILE, async (command, data) => {
            switch (command) {
                case Messages.Commands.Profile.READ:
                    if (data) return
                    push()
                    break
                case Messages.Commands.Profile.SAVE:
                    profile = data as Profile
                    await save()
                    break
            }
        })
    }
}

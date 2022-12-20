import { View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { NavigationScreenProp } from "react-navigation";
import { Profile } from "../state/ProfileManager";

type Properties = {
    name: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    secureTextEntry?: boolean
}

function CustomTextInput(properties: Properties) {
    const [focus, setFocus] = useState(false)

    return (
        <TextInput
            mode="flat"
            label={<Text style={{color: focus || properties.value.length > 0 ? "#90caf9" : "#ffffff"}}>{properties.name}</Text>}
            underlineColor={"#757575"}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChangeText={t => properties.setValue(t)}
            value={properties.value}
            style={{marginBottom: 16, backgroundColor: "#121212", color: "green"}}
            textColor={"#ffffff"}
            placeholderTextColor={"#ffffff"}
            secureTextEntry={!!properties.secureTextEntry}
            autoCapitalize={"none"}
            autoCorrect={false}
        />
    )
}

export default function({ navigation }: { navigation: NavigationScreenProp<any,any> }) {

    const [server, setServer] = useState(References.profileManager.getProfile().server)
    const [username, setUsername] = useState(References.profileManager.getProfile().username)
    const [password, setPassword] = useState(References.profileManager.getProfile().password)
    const [home, setHome] = useState(References.profileManager.getProfile().home)

    function cancel() {
        navigation.navigate("Home")
    }
    function save() {
        const profile: Profile = {
            server: server,
            username: username,
            password: password,
            home: home,
            init6: true
        }
        References.profileManager.setProfile(profile)
        navigation.navigate("Home")
    }

    return (
        <View style={{flex: 1, flexDirection: "column", backgroundColor: Colors.darker, padding: 16}}>
            <Text variant="displaySmall" style={{marginBottom: 16}}>Edit Profile</Text>
            <CustomTextInput name={"Server"} value={server} setValue={setServer} />
            <CustomTextInput name={"Username"} value={username} setValue={setUsername} />
            <CustomTextInput name={"Password"} value={password} setValue={setPassword} secureTextEntry />
            <CustomTextInput name={"Home"} value={home} setValue={setHome} />
            <View style={{flexDirection: "row", alignSelf: "flex-end"}}>
                <Button mode="text" style={{width: 100}} labelStyle={{fontSize: 16}} onPress={cancel}>
                    CANCEL
                </Button>
                <Button mode="text" style={{width: 80}} labelStyle={{fontSize: 16}} onPress={save}>
                    SAVE
                </Button>
            </View>
        </View>);
}

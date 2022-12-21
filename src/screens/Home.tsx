import Header from "../channel/Header";
import Chat from "../channel/Chat";
import Send from "../channel/Send";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useHeaderHeight } from "@react-navigation/elements";

export default function() {
    const height = useHeaderHeight()

    if (Platform.OS === "ios") {
        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={height}
                behavior="padding"
                enabled
                style={{flex: 1, flexDirection: "column", backgroundColor: Colors.darker}}
            >
                <Header />
                <Chat />
                <Send />
            </KeyboardAvoidingView>
        );
    } else {
        return (
            <View style={{flex: 1, flexDirection: "column", backgroundColor: Colors.darker}}>
                <Header />
                <Chat />
                <Send />
            </View>
        );
    }
}

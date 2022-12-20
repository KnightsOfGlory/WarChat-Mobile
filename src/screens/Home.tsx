import Header from "../channel/Header";
import Chat from "../channel/Chat";
import Send from "../channel/Send";
import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useHeaderHeight } from '@react-navigation/elements';

export default function() {
    const height = useHeaderHeight()

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={height + 47}
            behavior="padding"
            enabled
            style={{flex: 1, flexDirection: "column", backgroundColor: Colors.darker}}
        >
            <Header />
            <Chat />
            <Send />
        </KeyboardAvoidingView>);
}

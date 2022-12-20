import Header from "../channel/Header";
import Chat from "../channel/Chat";
import Send from "../channel/Send";
import React from "react";
import { View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function() {
    return (
        <View style={{flex: 1, flexDirection: "column", backgroundColor: Colors.darker}}>
            <Header />
            <Chat />
            <Send />
        </View>);
}

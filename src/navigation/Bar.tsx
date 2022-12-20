import * as React from "react";
import { Appbar } from "react-native-paper";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { Messages } from "@knightsofglory/warlibrary/lib/common/Messages";
import { Image, Text } from "react-native";
import { useEffect, useState } from "react";
import { ChatHelper } from "../utilities/ChatHelper";

export default function Bar() {

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    References.connectionManager.subscribe(
      "connected",
      (isConnected: boolean) => setConnected(isConnected)
    )
  }, [])

  const title = (
    <>
      <Image source={require("../../assets/logos/helmet-tail.png")} style={{width: 24, height: 24}} />&nbsp;
      <Text style={{marginLeft: 32}}>WarChat</Text>
    </>
  )

  return (
    <Appbar.Header style={{height: 36, backgroundColor: "#121212"}}>
      <Appbar.Action icon="menu" color={"#ffffff"} onPress={() => {}} />
      <Appbar.Content title={title} color={"#ffffff"} style={{alignItems: "center"}} />
      <Appbar.Action icon={connected ? "circle-slice-8" : "circle-outline"}
                     onPress={() => {
                       let message = connected ? "Disconnecting..." : "Connecting..."
                       References.chatManager.add(ChatHelper.makeBotChat(message))
                       References.messageBus.send(
                         Messages.Channels.SOCKET,
                         connected ? References.connectionManager.disconnect() : References.connectionManager.connect()
                       )
                     }}
                     color={"#ffffff"}/>
    </Appbar.Header>
  )
}

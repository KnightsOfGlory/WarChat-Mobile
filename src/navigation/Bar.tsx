import * as React from "react";
import { Appbar } from "react-native-paper";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { Messages } from "@knightsofglory/warlibrary/lib/common/Messages";
import { Image, Text } from "react-native";

export default function Bar() {

  const title = (
    <>
      <Image source={require("../../assets/logos/helmet-tail.png")} style={{width: 24, height: 24}} />&nbsp;
      <Text style={{marginLeft: 32}}>WarChat</Text>
    </>
  )

  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title={title} mode={"center-aligned"} />
      <Appbar.Action icon="circle-outline" onPress={() => References.messageBus.send(Messages.Channels.SOCKET, Messages.Commands.Socket.CONNECT)} />
      {/*<Appbar.Action icon="circle-slice-8" onPress={() => References.messageBus.send(Messages.Channels.SOCKET, Messages.Commands.Socket.CONNECT)} />*/}
    </Appbar.Header>
  )
}

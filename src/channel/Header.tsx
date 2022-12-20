import { View } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Channel } from "@knightsofglory/warlibrary/lib/state/ChannelManager";
import { References } from "@knightsofglory/warlibrary/lib/References";

export default function() {
  const channelDefault = { name: "", topic: "", users: 0 }

  const [connected, setConnected] = useState(false)
  const [channel, setChannel] = useState<Channel>(channelDefault)

  useEffect(() => {
    References.connectionManager.subscribe(
      "connected",
      (isConnected: boolean) => {
        setConnected(isConnected)
        if (!isConnected) setChannel(channelDefault)
      }
    )
    References.channelManager.subscribe(
      "current",
      (channel: Channel) => setChannel(channel)
    )
  }, [])

  let show = connected && channel.name != ""

  return (<View style={{height: show ? 24 : 0, padding: show ? 2 : 0, alignItems: "center", backgroundColor: "#424242"}}>
    <Text>
      <Text style={{fontWeight: "500"}}>
        {References.profileManager.getProfile().username + " "}
      </Text>
      <Text style={{fontWeight: "200"}}>
        in
      </Text>
      <Text style={{fontWeight: "500"}}>
        {" " + channel.name}
      </Text>
    </Text>
  </View>)
}

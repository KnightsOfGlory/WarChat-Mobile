import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { ChatHelper } from "../utilities/ChatHelper";

export default function() {
  const [message, setMessage] = useState("")
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    References.connectionManager.subscribe("connected", (isConnected: boolean) => setConnected(isConnected))
  }, [])

  return (
    <TextInput
      value={message}
      onChangeText={text => setMessage(text)}
      disabled={!connected}
      right={<TextInput.Icon onPress={() => {
        References.messageBus.send("chat", message)
        if (!message.startsWith("/") && !References.profileManager.getProfile().init6) {
          References.chatManager.add(ChatHelper.makeSelfChat(message))
        }
        setMessage("")
      }} icon="send" />}
      style={{margin: 8, marginBottom: 32}}
      mode={"outlined"}
    />
  )
}

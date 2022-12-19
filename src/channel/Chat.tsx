import { ScrollView, useColorScheme } from "react-native";
import { List } from "react-native-paper";
import { AvatarHelper } from "../utilities/AvatarHelper";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { useEffect, useState } from "react";
import { Chat } from "@knightsofglory/warlibrary/lib/state/ChatManager";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function() {

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    References.chatManager.subscribe(
      "chats",
      (newChats: Chat[]) => { console.log(newChats); setChats([...newChats]) }
    )
  }, []);

  const backgroundStyle = {
    backgroundColor: Colors.darker
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
      {
        chats.map((c: Chat) =>
          <List.Item
            key={Math.random()}
            title={c.user.name}
            description={c.message}
            left={() => AvatarHelper.getAvatar(c.user)}
            style={{paddingTop: 0, paddingBottom: 0}}
          />
        )
      }
    </ScrollView>
  )
}

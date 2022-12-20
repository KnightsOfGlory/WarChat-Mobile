import { Platform, ScrollView, View } from "react-native";
import { Chip, Divider, List } from "react-native-paper";
import { AvatarHelper } from "../utilities/AvatarHelper";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { useEffect, useRef, useState } from "react";
import { Chat } from "@knightsofglory/warlibrary/lib/state/ChatManager";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ChatHelper } from "../utilities/ChatHelper";
import { User } from "@knightsofglory/warlibrary/lib/state/UserManager";
import { Text } from 'react-native-paper';
import React from "react";

export default function() {

  const [chats, setChats] = useState<Chat[]>([]);
  const scrollViewRef = useRef<ScrollView>();

  useEffect(() => {
    References.chatManager.subscribe(
      "chats",
      (newChats: Chat[]) => {
        setChats([...newChats]);
      },
    );
  }, []);

  const grouped = () => {
    let groups: Chat[][] = [];
    let group: Chat[] = [];
    let user: User | null = null;

    chats.forEach((message) => {
      if (message.hasOwnProperty("channel")) {
        groups.push(group);
        groups.push([message]);
        group = [];
        return;
      }

      if ((References.settingsManager.getSettings().ignoreEmotes && message.hasOwnProperty("isEmote")) ||
          (References.settingsManager.getSettings().ignoreBots && message.user.bot) ||
          (References.settingsManager.getSettings().ignoreBans && ChatHelper.isBanMessage(message.message)) ||
          (References.settingsManager.getSettings().ignoreAntiIdles && ChatHelper.isAntiIdle(message.message))) {
        return;
      }

      // if (group.map(g => g.message.length).reduce((s, a) => s + a, 0) > 1) {
      //   groups.push(group);
      //   group = [];
      // }

      if (message.user != null && user != null && message.user.name != user.name) {
        groups.push(group);
        group = [];
      }

      group.push(message);
      user = message.user;
    });

    if (group.length > 0) {
      groups.push(group);
    }

    return groups;
  };

  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
                // @ts-ignore
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
                style={backgroundStyle}>
      {
        grouped().map((group) => {
          if (group[0] == undefined) return
          if (group[0].user == undefined) return
          if (group[0].user.client == undefined) return

          if (group[0].hasOwnProperty("channel")) {
            return (
              <View key={Math.random()} style={{height: 24, padding: 2, alignItems: "center", backgroundColor: "#424242"}}>
                <Text>
                  <Text style={{fontWeight: "200"}}>
                    Channel:
                  </Text>
                  <Text style={{fontWeight: "500"}}>
                    {" "}#Clan [vL]
                  </Text>
                </Text>
              </View>
              // <Chip compact key={Math.random()} style={{
              //   backgroundColor: "#424242",
              //   height: 32,
              //   alignItems: "center",
              //   justifyContent: "center",
              //   marginLeft: 8,
              //   marginRight: 8,
              // }}>
              //   <Text style={{color: "#ffffff"}}>
              //     {
              //       // @ts-ignore
              //       "Channel: " + group[0].channel
              //     }
              //   </Text>
              // </Chip>
            )
          }

          let said = group.map((c) => c.message)

          if (said.length == 0) return

          let saying = Platform.OS === "ios" ? (
            <View>
              <Text style={{color: "#fff"}}>
                {said.join("\n").trim()}
              </Text>
            </View>
          ) : (
              <Text style={{color: "#fff"}}>
                {said.join("\n").trim()}
              </Text>
          )

          let color = "#90caf9"
          if (group[0].user && References.profileManager.getProfile().username &&
              group[0].user.name == References.profileManager.getProfile().username) {
            color = "#66bbba"
          }

          let name = (
            <Text style={{color: color}}>{group[0].user.name}</Text>
          )

          let description = function() {
            return saying
          }

          return (
              <List.Item
                key={Math.random()}
                title={name}
                description={description}
                descriptionEllipsizeMode={"clip"}
                left={() => AvatarHelper.getAvatar(group[0].user)}
                style={{ paddingTop: 0, paddingBottom: 0}}
              />
          )
        })
      }
    </ScrollView>
  );
}

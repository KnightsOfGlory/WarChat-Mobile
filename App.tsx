import React from "react";
import { StatusBar, useColorScheme, View } from "react-native";
import Bar from "./src/navigation/Bar";
import Chat from "./src/channel/Chat";
import Send from "./src/channel/Send";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function() {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <View style={{flex: 1, flexDirection: "column", backgroundColor: Colors.darker}}>
      <StatusBar barStyle={'dark-content'} />
      <Bar />
      <Chat />
      <Send />
    </View>
  );
};

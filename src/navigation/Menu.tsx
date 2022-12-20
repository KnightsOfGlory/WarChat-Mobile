import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import Home from "../screens/Home";
import { BackHandler, Image, Linking, Platform, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { ChatHelper } from "../utilities/ChatHelper";
import { Messages } from "@knightsofglory/warlibrary/lib/common/Messages";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MuiIcon from 'react-native-vector-icons/MaterialIcons';
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

// @ts-ignore
function DrawerContent(props) {

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Connect"
                icon={() => <Icon name={"circle-slice-8"} color={"#ffffff"} size={24} />}
                onPress={() => {
                    References.chatManager.add(ChatHelper.makeBotChat("Connecting..."))
                    References.connectionManager.connect()
                    props.navigation.closeDrawer()
                }}
                labelStyle={{ color: "#ffffff" }}
            />
            <DrawerItem
                label="Disconnect"
                icon={() => <Icon name={"circle-outline"} color={"#ffffff"} size={24} />}
                onPress={() => {
                    References.chatManager.add(ChatHelper.makeBotChat("Disconnecting..."))
                    References.connectionManager.disconnect()
                    props.navigation.closeDrawer()
                }}
                labelStyle={{ color: "#ffffff" }}
            />
            <View style={{ borderBottomColor: '#757575', borderBottomWidth: 1 }}/>
            <DrawerItem
                label="Channel"
                icon={() => <Icon name={"home"} color={"#ffffff"} size={24} />}
                onPress={() => props.navigation.navigate("Home")}
                labelStyle={{ color: "#ffffff" }}
            />
            <DrawerItem
                label="Profile"
                icon={() => <Icon name={"badge-account-horizontal-outline"} color={"#ffffff"} size={24} />}
                onPress={() => props.navigation.navigate("Profile")}
                labelStyle={{ color: "#ffffff" }}
            />
            <DrawerItem
                label="Settings"
                icon={() => <MuiIcon name={"settings"} color={"#ffffff"} size={24} />}
                onPress={() => {}}
                labelStyle={{ color: "#ffffff" }}
            />
            <DrawerItem
                label="Update"
                icon={() => <MuiIcon name={"upgrade"} color={"#ffffff"} size={24} />}
                onPress={() => {}}
                labelStyle={{ color: "#ffffff" }}
            />
        </DrawerContentScrollView>
    );
}

export default function() {

    const [connected, setConnected] = useState(false)

    useEffect(() => {
        References.connectionManager.subscribe(
            "connected",
            (isConnected: boolean) => setConnected(isConnected)
        )
    }, [])

    const ios = Platform.OS === "ios"

    const title = (
        <Text style={{paddingRight: ios ? 0 : 16}}>
            <Image source={require("../../assets/logos/helmet-tail.png")} style={{width: 24, height: 24}} />
            <Text style={{color: "#ffffff", fontSize: ios ? 24 : 18}}> WarChat</Text>
        </Text>)

    const icon = connected ? "circle-slice-8" : "circle-outline"
    const togglePress = () => {
        let message = connected ? "Disconnecting..." : "Connecting..."
        References.chatManager.add(ChatHelper.makeBotChat(message))
        References.messageBus.send(
            Messages.Channels.SOCKET,
            connected ? References.connectionManager.disconnect() : References.connectionManager.connect()
        )
    }
    const toggle = (<IconButton icon={icon} onPress={togglePress} iconColor={"#ffffff"} />)

    const options = {
        headerTitle: () => title,
        headerTitleStyle: { color: "#ffffff" },
        headerStyle: { backgroundColor: "#121212" },
        headerRight: () => toggle,
    }

  // @ts-ignore
    return (
      <Drawer.Navigator initialRouteName="Home"
                        drawerContent={DrawerContent}
                        screenOptions={{
                            headerTitleAlign: "center",
                            headerTintColor: "#ffffff",
                            drawerActiveBackgroundColor: "#757575",
                            drawerInactiveBackgroundColor: "#424242",
                            drawerStyle: {
                                backgroundColor: "#424242"
                            }
                        }}
      >
          <Drawer.Screen name="Home" component={Home} options={options} />
          <Drawer.Screen name="Profile" component={Profile} options={options} />
      </Drawer.Navigator>
  );
}

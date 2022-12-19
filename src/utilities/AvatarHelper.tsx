import * as React from "react";
import { ReactElement } from "react";
import { ProductIcons } from "./ProductIcons";
import { UserFlags } from "./UserFlags";
import { References } from "@knightsofglory/warlibrary/lib/References";
import { User } from "@knightsofglory/warlibrary/lib/state/UserManager";
// @ts-ignore
import Avatar from 'react-native-boring-avatars';
import { Image, View } from "react-native";

export namespace AvatarHelper {

  export function getAvatar(user: User): ReactElement {
    let icon = ProductIcons.getByClient(user.client.trim(), user.flags as string);
    let special =
      References.profileManager.getProfile().init6 ?
        UserFlags.Init6.isAdministrator(user.flags) ||
        UserFlags.Init6.isOperator(user.flags)
        :
        UserFlags.isAdministrator(user.flags) ||
        UserFlags.isOperator(user.flags);
    let useBoring =
      !user.bot &&
      user.client == "[CHAT]" &&
      !special;

    return useBoring ? (
      <View style={{ marginLeft: 16 }}>
        <Avatar name={user.name} variant="beam" colors={["#1976D2", "#414756", "#A5ABBD", "#C94669"]} size={32} />
      </View>
    ) : (
      <View style={{ marginLeft: 16 }}>
        <Image source={icon} style={{ width: 32, height: 32 }} />
      </View>
    )
  }
}

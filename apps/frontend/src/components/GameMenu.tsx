import { Icon, Menu } from "native-base";
import { Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { useAppDataContext } from "../utils/state";



export function GameMenu() {
  const { exitGame } = useAppDataContext()
  return <Menu trigger={triggerProps => {
    return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
      <Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />
    </Pressable>;
  }}>
    <Menu.Item>Change Game Name</Menu.Item>
    <Menu.Item>Show Game QR code</Menu.Item>
    <Menu.Item onPress={() => exitGame()}>Exit</Menu.Item>
  </Menu>;
}
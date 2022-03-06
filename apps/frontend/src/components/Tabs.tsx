import React from "react";
import { Box, Center, Text, HStack, Pressable, Icon } from "native-base";
import { useState } from "react";
import { AppBar, IAppBarProps } from "./AppBar";
import { useThemeConfig } from "../theme";
export interface TabItem {
  icon: JSX.Element;
  text: string;
  component: JSX.Element;
}
export interface ITabsProps extends IAppBarProps {
  tabs: TabItem[]
  defaultSelectionIndex: number
}
export function Tabs(props: ITabsProps) {
  const [selected, setSelected] = useState(props.defaultSelectionIndex);
  const { barBgColor, barTxtColor } = useThemeConfig();
  return (
    <Box flex={1} width="100%" alignSelf="center">
      <Box flex={1}>
        {
          props.tabs[selected].component
        }
      </Box>
      <HStack bg={barBgColor} alignItems="center" safeAreaBottom shadow={6}>
        {
          props.tabs.map((item, index) =>
            <Pressable opacity={selected === index ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(index)} key={index}>
              <Center>
                <Icon mb="1" as={item.icon} color="white" size="sm" />
                <Text color={barTxtColor} fontSize="12">
                  {item.text}
                </Text>
              </Center>
            </Pressable>
          )
        }
      </HStack>
    </Box>)
}
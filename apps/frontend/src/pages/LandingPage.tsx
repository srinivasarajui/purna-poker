import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Text, Container, useBreakpointValue } from "native-base";


import React from "react";
import { TabItem, Tabs } from "../components/Tabs";
import { CreateFragment } from "../fragment/CreateFragment";
import { JoinFragment } from "../fragment/JoinFragment";

function LandingTabs() {
  const array: TabItem[] = [
    {
      icon: <MaterialCommunityIcons name={"newspaper-plus"} />,
      text: 'Create',
      component: <CreateFragment />
    },
    {
      icon: <FontAwesome5 name="sign-in-alt" />,
      text: 'Join',
      component: <JoinFragment />
    },

  ]

  return (
    <Tabs tabs={array} defaultSelectionIndex={1} title="Purna Scrum Poker" />
  )

}
export function LandingPage() {
  const isTab = useBreakpointValue({
    base: true,
    md: false
  });
  if(isTab){
    return <LandingTabs />
  }
  return (
    <HStack flex={1}
      width="100%">
      <Container flex={1}>
      <CreateFragment />
      </Container>
      <Container flex={1}>
      <JoinFragment />
      </Container>
    </HStack>
  );
}

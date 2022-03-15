import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Text, Container, useBreakpointValue } from "native-base";


import React from "react";
import { TabItem, Tabs } from "../components/Tabs";
import { MainGameFragment } from "../fragment/MainGameFragment";
import { OtherParticipantsFragment } from "../fragment/OtherParticipantsFragment";
import { StoriesFragment } from "../fragment/StoriesFragment";

function GameTabs() {
  const array: TabItem[] = [
    {
      icon: <MaterialCommunityIcons name={"newspaper-plus"} />,
      text: 'Others',
      component: <OtherParticipantsFragment />
    },
    {
      icon: <FontAwesome5 name="sign-in-alt" />,
      text: 'Your Estimation',
      component: <MainGameFragment />
    },

    {
      icon: <FontAwesome5 name="sign-in-alt" />,
      text: 'Stories',
      component: <StoriesFragment />
    },
  ]

  return (
    <Tabs tabs={array} defaultSelectionIndex={1} title="Purna Scrum Poker" />
  )

}
export function GamePage() {
  const isTab = useBreakpointValue({
    base: true,
    md: false
  });
  if (isTab) {
    return <GameTabs />
  }
  return (
    <HStack flex={1}
      width="100%">
      <Container flex={1}>
        <OtherParticipantsFragment />
      </Container>
      <Container flex={1}>
        <MainGameFragment />
      </Container>
      <Container flex={1}>
        <StoriesFragment />
      </Container>
    </HStack>
  );
}

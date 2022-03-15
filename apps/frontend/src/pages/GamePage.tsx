import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Game } from "backend";
import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Text, Container, useBreakpointValue } from "native-base";


import React, { useEffect, useMemo, useState } from "react";
import { TabItem, Tabs } from "../components/Tabs";
import { MainGameFragment } from "../fragment/MainGameFragment";
import { OtherParticipantsFragment } from "../fragment/OtherParticipantsFragment";
import { StoriesFragment } from "../fragment/StoriesFragment";
import { useAppDataContext } from "../utils/state";
import { trpc } from "../utils/trpc";
import { GameProps } from "../utils/types";

function GameTabs(props: GameProps) {
  const array: TabItem[] = [
    {
      icon: <MaterialCommunityIcons name={"newspaper-plus"} />,
      text: 'Others',
      component: <OtherParticipantsFragment {...props} />
    },
    {
      icon: <FontAwesome5 name="sign-in-alt" />,
      text: 'Your Estimation',
      component: <MainGameFragment {...props} />
    },

    {
      icon: <FontAwesome5 name="sign-in-alt" />,
      text: 'Stories',
      component: <StoriesFragment {...props} />
    },
  ]

  return (
    <Tabs tabs={array} defaultSelectionIndex={2} title="Purna Scrum Poker" />
  )

}
function GameFullPage(props: GameProps) {
  return <HStack flex={1}
    width="100%">
    <Container flex={1}>
      <OtherParticipantsFragment {...props} />
    </Container>
    <Container flex={1}>
      <MainGameFragment {...props} />
    </Container>
    <Container flex={1}>
      <StoriesFragment {...props} />
    </Container>
  </HStack>
}
export function GamePage() {
  const isTab = useBreakpointValue({
    base: true,
    md: false
  });
  const { gameId, userId, adminCode } = useAppDataContext();
  const [game, setGame] = useState<Game>();
  const result = trpc.useQuery(['game.getbyId', { gameId }])
  trpc.useSubscription(['game.gameUpdated', { gameId, userName: userId, adminCode }], {
    onNext(n) {
      setGame(n);
    },
  });
  useEffect(() => {
    if (result.isFetched) {
      setGame(result.data);
    }
    console.log(result.data);
  }, [result]);

  const isAdmin = !!useMemo(() => game?.participants.find(p => p.name === userId)?.isAdmin, [game?.participants, userId]);
  return game ? (
    isTab ? <GameTabs game={game} userId={userId} adminCode={adminCode} isAdmin={isAdmin} />
      : <GameFullPage game={game} userId={userId} adminCode={adminCode} isAdmin={isAdmin} />
  )
    : (<Center w="100%"><Text>Loading...</Text></Center>);

}

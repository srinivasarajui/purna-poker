
import React from "react";
import { Box, VStack, Button, Center, HStack, Select, CheckIcon, Text } from "native-base";
import { Game } from "backend";
import { GameProps } from "../utils/types";
import { GameControl } from "../components/GameControl";
import { StoryPointCard } from "../components/StoryPointsCard";
import { YourEstimationCard } from "../components/YourEstimationCard";
import { StoryDescription } from "../components/StoryDescription";

export function MainGameFragment(props: GameProps) {
  return <Box p="2" gap={2}>
    {
      props.isAdmin && <GameControl {...props} />
    }
    {
      !props.game.didGameStart ?
        (<Center>
          <Text fontSize="md" bold>Game should be started</Text>
        </Center>) : (<>
          <StoryDescription {...props} />
          <StoryPointCard {...props} />
          <YourEstimationCard {...props} />
        </>)
    }

  </Box>;
}


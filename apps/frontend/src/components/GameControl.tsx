import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { gameCache } from "backend/src/game-cache";
import { Box, Button, Center, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { trpc } from "../utils/trpc";
import { GameProps } from "../utils/types";


export function GameControl(props: GameProps) {
    const startGameMutation = trpc.useMutation('game.startGame');
    const stopGameMutation = trpc.useMutation('game.stopGame');

    return (<Box width="100%" p="2" shadow={2} rounded="lg" >
        <VStack>
            <Center>
                <Text fontSize="md" bold>Game Control</Text>
            </Center>
            <Center>
                <HStack gap={2} p={2}>
                    {props.game.didGameStart ?
                        <Button variant="outline"
                            leftIcon={<Icon as={MaterialCommunityIcons} name="stop" size="xs" />}
                            onPress={() => stopGameMutation.mutate({ gameId: props.game.id })}
                        >Stop Game</Button> :
                        <Button variant="outline"
                            leftIcon={<Icon as={MaterialCommunityIcons} name="play" size="xs" />}
                            onPress={() => startGameMutation.mutate({ gameId: props.game.id })}
                            isDisabled={props.game.stories.length === 0}
                        >Start Game</Button>
                    }

                </HStack>
                <HStack gap={2} p={2}>
                    <Button.Group isAttached mx={{ base: "auto", md: 0 }} size="sm" isDisabled={!props.game.didGameStart}  >
                        <Button variant="outline" leftIcon={<Icon as={MaterialIcons} name="skip-previous" size="xs" />} >Previous</Button>
                        <Button variant="outline" rightIcon={<Icon as={MaterialIcons} name="skip-next" size="xs" />} >Next</Button>
                    </Button.Group>
                    <Button.Group isAttached mx={{ base: "auto", md: 0 }} size="sm" isDisabled={!props.game.didGameStart}>
                        <Button variant="outline" leftIcon={<Icon as={MaterialIcons} name="flip-camera-android" size="xs" />} >Flip Cards</Button>
                        <Button variant="outline" rightIcon={<Icon as={MaterialCommunityIcons} name="lock-reset" size="xs" />} >Reset</Button>
                    </Button.Group>
                </HStack>
                {props.game.stories.length === 0 &&
                    <HStack gap={2} p={2}>
                        <Text>You cant start the game with zero Stories</Text>
                    </HStack>
                }
            </Center>
        </VStack>
    </Box>)
}
import { Box, Text, VStack } from "native-base";
import { getStoryById } from "../utils/helpers";
import { GameProps } from "../utils/types";

export function StoryDescription(props: GameProps) {
    const story = getStoryById(props.game, props.game.currentStoryId);
    return <Box width="100%" p="2" shadow={2} rounded="lg" >
        <VStack>
            <Text fontSize="md" bold>Story Description</Text>
            <Text fontSize="md">{story.description} </Text>
        </VStack>
    </Box>
}
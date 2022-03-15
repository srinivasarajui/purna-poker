
import { Box, Center, Text, VStack } from "native-base";
import { GameProps } from "../utils/types";

export function StoryPointCard(props: GameProps) {
    return <Center >
        <Box width="50%" bg="primary.500" p="4" shadow={2} rounded="lg" margin={2} >
            <VStack>
                <Center>
                    <Text fontSize="md" >Story Points</Text>
                </Center>
                <Center>
                    <Text fontSize="lg" bold>Waiting</Text>
                </Center>
            </VStack>
        </Box>
    </Center>
}
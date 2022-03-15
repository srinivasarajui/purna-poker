
import { Box, Center, CheckIcon, Select, Text, VStack } from "native-base";
import React from "react";
import { GameProps } from "../utils/types";

export function YourEstimationCard(props: GameProps) {
    let [service, setService] = React.useState("");
    return <Center >
        <Box width="80%" p="2" shadow={2} rounded="lg" >
            <VStack>
                <Center>
                    <Text fontSize="md" bold>Your Estimation</Text>
                </Center>
                <Center>
                    <Select selectedValue={service} minWidth="100" maxWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                        <Select.Item label="1 Point" value="1" bg="green.500" />
                        <Select.Item label="2 Points" value="2" bg="green.500" />
                        <Select.Item label="3 Points" value="3" bg="green.500" />
                        <Select.Item label="5 Points" value="5" bg="green.500" />
                        <Select.Item label="8 Points" value="8" bg="green.500" />
                        <Select.Item label="13 Points" value="13" bg="red.500" />
                        <Select.Item label="21 Points" value="21" bg="red.500" />
                        <Select.Item label="44 Points" value="44" bg="red.500" />
                        <Select.Item label="I have question" value="-1" bg="amber.500" />
                        <Select.Item label="I will pass this question" value="-2" bg="amber.500" />
                    </Select>
                </Center>
            </VStack>
        </Box>
    </Center>
}
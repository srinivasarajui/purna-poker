
import React from "react";
import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Select, CheckIcon, TextArea, WarningOutlineIcon, useColorModeValue, Text } from "native-base";
export function MainGameFragment() {
  let [service, setService] = React.useState("");
  return <Box p="2"gap={2}>
      <Box width="100%"  p="2" shadow={2} rounded="lg" >
        <VStack>
          <Center>
            <Text fontSize="md" bold>Game Control</Text>
          </Center>
          <Center>
            <HStack gap={2} p={2}>
              <Button.Group isAttached  mx={{
                base: "auto",
                md: 0
              }} size="sm">
                <Button variant="outline" _text={{
                  color: "white"
                }}>Previous</Button>
                <Button variant="outline" _text={{
                  color: "white"
                }}>Next</Button>
              </Button.Group>
              <Button.Group isAttached mx={{
                base: "auto",
                md: 0
              }} size="sm">
                <Button variant="outline" _text={{
                  color: "white"
                }}>Flip Cards</Button>
                <Button variant="outline" _text={{
                  color: "white"
                }}>Reset</Button>
              </Button.Group>
              <Button variant="outline" _text={{
                color: "white"
              }}>Stop Game</Button>
            </HStack>
          </Center>
        </VStack>
      </Box>

      <Box width="100%" p="2" shadow={2} rounded="lg" >
          <VStack>
          <Text fontSize="md" bold>Story Description</Text>
          <Text fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          </VStack>
      </Box>

      <Center >
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
      <Center >
      <Box width="80%"  p="2" shadow={2} rounded="lg" >
        <VStack>
          <Center>
          <Text fontSize="md" bold>Your Estimation</Text>
          </Center>
            <Center>
          <Select selectedValue={service} minWidth="100" maxWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="1 Point" value="1"  bg="green.500" />
            <Select.Item label="2 Points" value="2" bg="green.500" />
            <Select.Item label="3 Points" value="3" bg="green.500"/>
            <Select.Item label="5 Points" value="5" bg="green.500"/>
            <Select.Item label="8 Points" value="8" bg="green.500" />
            <Select.Item label="13 Points" value="13" bg="red.500"/>
            <Select.Item label="21 Points" value="21" bg="red.500"/>
            <Select.Item label="44 Points" value="44" bg="red.500"/>
            <Select.Item label="I have question" value="-1" bg="amber.500"/>
            <Select.Item label="I will pass this question" value="-2" bg="amber.500"  />
          </Select>
          </Center>
        </VStack>
      </Box>
      </Center>
    </Box>;
}


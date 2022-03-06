import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Text } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';

import React from "react";

export function JoinFragment(){
  return (<Center w="100%">
    <Box  p="2" w="90%"  py="8">
      <Heading size="lg" fontWeight="semibold">
        Join an existing game
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label><Text>User name</Text></FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Game code</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>

          <FormControl.Label>Admin Code(optional)</FormControl.Label>
          <Input type="password" />

        </FormControl>
        <Button mt="2" >
          Go to Game
        </Button>

      </VStack>
    </Box>
  </Center>);
}

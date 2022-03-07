import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Select, CheckIcon, TextArea, WarningOutlineIcon, useColorModeValue } from "native-base";
import { trpc } from '../utils/trpc';
import React, { useEffect } from "react";

export function CreateFragment() {
  const votingSystems = trpc.useQuery(['votingSystems.list']);
  useEffect(()=>{
    if (votingSystems?.data){
      console.log(votingSystems.data.length)
    }
  }, [votingSystems])
  return (<Center w="100%">
    <Box  p="2" w="90%" py="8">
      <Heading size="lg" fontWeight="semibold">
        Create a new game
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label >User name</FormControl.Label>
          <Input variant="outline" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Game Description</FormControl.Label>
          <Input variant="outline" />
        </FormControl>
        <Button mt="2" >
          Create a new Game
        </Button>

      </VStack>
    </Box>
  </Center>);
}
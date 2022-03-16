
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, Badge } from "native-base";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { Game } from "backend";
import { GameProps } from "../utils/types";

export function ParticipantsFragment(props: GameProps) {
  return (
    <Center width="100%">
      <Box flex={1} width="90%" maxHeight="100%">
        <Heading fontSize="xl" p="4" pb="3">
          Users
        </Heading>
        <FlatList data={props.game.participants} renderItem={({
          item
        }) => <Box borderBottomWidth="1" pl="4" pr="5" py="2">
            <HStack space={3} alignItems="center">
              <Avatar size="6" bgColor={item.isConnected ? "green.500" : "gray.500"}  >
                {
                  item.isConnected ? <FontAwesome name="chain" size={12} color="black" /> : <FontAwesome name="chain-broken" size={12} color="black" />
                }
              </Avatar>
              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.name}
              </Text>
              <Spacer />
              <Badge colorScheme="success">5 Points</Badge>
            </HStack>
          </Box>} keyExtractor={item => item.name} />
      </Box></Center>);
}

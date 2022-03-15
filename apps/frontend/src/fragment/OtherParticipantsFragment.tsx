
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, Badge } from "native-base";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';
import { Game } from "backend";
import { GameProps } from "../utils/types";

export function OtherParticipantsFragment(props: GameProps) {
  const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
  }, {
    id: "68694a0f-3da1-431f-bd56-142371e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today."
  }];
  return (
    <Center width="100%">
      <Box flex={1} width="90%" maxHeight="100%">
        <Heading fontSize="xl" p="4" pb="3">
          Users
        </Heading>
        <FlatList data={data} renderItem={({
          item
        }) => <Box borderBottomWidth="1" _dark={{
          borderColor: "gray.600"
        }} borderColor="coolGray.200" pl="4" pr="5" py="2">
            <HStack space={3} alignItems="center">
              <Avatar size="6" bgColor="green.500"  >
                { //<FontAwesome name="chain-broken" size={24} color="white" />
                }
                <FontAwesome name="chain" size={12} color="black" />
              </Avatar>

              <Text _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" bold>
                {item.fullName}
              </Text>
              <Spacer />
              <Badge colorScheme="success">5 Points</Badge>

            </HStack>
          </Box>} keyExtractor={item => item.id} />
      </Box></Center>);
}

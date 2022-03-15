import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar, Badge, Box, Button, FlatList, Heading, HStack, ScrollView, View, Spacer, Text, Center, Icon } from "native-base";
import React from "react";
import { GameProps } from "../utils/types";

export function StoriesFragment(props: GameProps) {
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
  }
  ];
  return <Center width="100%" >
    <Box flex={1} width="90%" maxHeight="100%">
      <Heading fontSize="xl" p="4" pb="3">
        Stories
      </Heading>
      <HStack gap={2} space={2}   >
        <Button leftIcon={<Icon as={Ionicons} name="add" size="xs" />}>Add A New Story</Button>
        <Button leftIcon={<Icon as={Ionicons} name="download" size="xs" />}>Download</Button>
      </HStack>
      <View >
        <ScrollView _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72"

        }}>
          <FlatList data={data} renderItem={({
            item
          }) => <Box borderBottomWidth="1" _dark={{
            borderColor: "gray.600"
          }} borderColor="coolGray.200" pl="4" pr="5" py="2">
              <HStack space={3} alignItems="center">
                <Avatar size="48px" bgColor="green.500"  >
                  { //<FontAwesome name="chain-broken" size={24} color="white" />
                  }
                  <FontAwesome name="chain" size={24} color="black" />
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
        </ScrollView>
      </View>

    </Box>
  </Center>;
}
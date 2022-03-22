import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar, Badge, Box, Button, FlatList, Heading, HStack, ScrollView, View, Spacer, Text, Center, Icon, Modal, TextArea } from "native-base";
import React from "react";
import { StoryManagePopup } from "../components/StoryManagePopup";
import { trpc } from "../utils/trpc";
import { GameProps } from "../utils/types";

export function StoriesFragment(props: GameProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [modalStoryDesc, setModalStoryDesc] = React.useState("");
  const addStoryMutation = trpc.useMutation("game.addStory");
  const addStoryClick = () => {
    setModalStoryDesc("");
    setShowModal(true);
    console.log("addStoryClick");
  }
  const closeModal = () => {
    setShowModal(false);
  }
  const addStory = () => {
    addStoryMutation.mutate({ gameId: props.game.id, description: modalStoryDesc });
    setShowModal(false);
  }
  return <Center width="100%" >
    <Modal isOpen={showModal} onClose={closeModal} >
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Story Description</Modal.Header>
        <Modal.Body>
          <Center>
            <TextArea h={20} placeholder="Story description" w="75%" maxW="300" value={modalStoryDesc} onChangeText={itemValue => setModalStoryDesc(itemValue)} />
          </Center>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button onPress={() => addStory()}>
              Go To Game
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
    <Box flex={1} width="90%" maxHeight="100%">
      <Heading fontSize="xl" p="4" pb="3">
        Stories
      </Heading>
      <HStack gap={2} space={2}   >
        <Button onPress={() => addStoryClick()}
          leftIcon={<Icon as={Ionicons} name="add" size="xs" />} >Add A New Story</Button>
        <Button leftIcon={<Icon as={Ionicons} name="download" size="xs" />}>Download</Button>
      </HStack>
      <View >
        <ScrollView _contentContainerStyle={{
          px: "20px",
          mb: "4",
          minW: "72"

        }}>
          {
            props.game.stories.length > 0 ?
              <FlatList data={props.game.stories} renderItem={({
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
                      {item.description}
                    </Text>
                    <Spacer />
                    <Badge colorScheme="success">5 Points</Badge>

                  </HStack>
                </Box>} keyExtractor={item => item.id} />
              : <Center><Text >No stories yet</Text></Center>
          }

        </ScrollView>
      </View>

    </Box>
  </Center>;
}
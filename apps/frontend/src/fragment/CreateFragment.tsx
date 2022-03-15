import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Select, CheckIcon, TextArea, WarningOutlineIcon, useColorModeValue } from "native-base";
import { trpc } from '../utils/trpc';
import React, { useEffect, useState } from "react";
import { Game } from "backend";
import { GameDetailsPopup } from '../components/GameDetailsPopup';

enum CreateGameActions {
  CHANGE_USER_NAME = 'changeUserName',
  CHANGE_GAME_NAME = 'changeGameName',
  CHANGE_VOITING_SYSTEM = 'changeVoitingSystem',

}
interface CreateGameAction {
  type: CreateGameActions;
  payload: string;
}

interface CreateGameState {
  userName: string;
  gameName: string;
  voitingSystem: string;
  isUserNameValid: boolean;
  isGameNameValid: boolean;
  isVoitingSystemValid: boolean;
  isButtonDisabled: boolean;
}


// Our reducer function that uses a switch statement to handle our actions
function CreateGameReducer(state: CreateGameState, action: CreateGameAction) {
  let { type, payload } = action;
  payload = payload.trim();
  const nextState: CreateGameState = { ...state };
  switch (type) {
    case CreateGameActions.CHANGE_USER_NAME:
      nextState.userName = payload;
      nextState.isUserNameValid = payload.length !== 0;
      break;
    case CreateGameActions.CHANGE_GAME_NAME:
      nextState.gameName = payload;
      nextState.isGameNameValid = payload.length !== 0;
      break
    case CreateGameActions.CHANGE_VOITING_SYSTEM:
      nextState.voitingSystem = payload;
      nextState.isVoitingSystemValid = payload.length !== 0;
  }
  nextState.isButtonDisabled = !(nextState.userName.trim().length > 0 && nextState.gameName.trim().length > 0 && nextState.voitingSystem.length > 0);
  return nextState;
}



export function CreateFragment() {
  const [showModal, setShowModal] = useState(false);
  const [game, setGame] = useState<Game>();
  const votingSystems = trpc.useQuery(['votingSystems.list']);
  const mutation = trpc.useMutation('game.createGame', {
    async onSuccess(data: Game) {
      console.log('create game success', data);
      setGame(data);
      setShowModal(true);
    },
  });
  const [state, dispatch] = React.useReducer(CreateGameReducer, {
    userName: '',
    gameName: '',
    voitingSystem: '',
    isUserNameValid: true,
    isGameNameValid: true,
    isVoitingSystemValid: true,
    isButtonDisabled: true,
  });
  const handleCreateGame = async () => {
    mutation.mutate({
      name: state.gameName, votingSystemId: state.voitingSystem,
      userName: state.userName
    });
  };
  return (<Center w="100%">

    <GameDetailsPopup showModal={showModal} game={game} closeModel={() => setShowModal(false)} />
    <Box p="2" w="90%" py="8">
      <Heading size="lg" fontWeight="semibold">
        Create a new game
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={!state.isUserNameValid}>
          <FormControl.Label >User name</FormControl.Label>
          <Input variant="outline" value={state.userName} onChangeText={itemValue => dispatch({ type: CreateGameActions.CHANGE_USER_NAME, payload: itemValue })} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            User name is required.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!state.isGameNameValid}>
          <FormControl.Label>Game Name</FormControl.Label>
          <Input variant="outline" value={state.gameName} onChangeText={itemValue => dispatch({ type: CreateGameActions.CHANGE_GAME_NAME, payload: itemValue })} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Game name is required.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!state.isVoitingSystemValid}>
          <FormControl.Label>Voting System</FormControl.Label>
          <Select accessibilityLabel="Voting System" placeholder="Choose Voting System" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />
          }} mt="1"
            selectedValue={state.voitingSystem} onValueChange={itemValue => dispatch({ type: CreateGameActions.CHANGE_VOITING_SYSTEM, payload: itemValue })}
          >
            {
              votingSystems.isLoading ? (<Select.Item label="loading..." value="loading" key="loading" />)
                : (votingSystems.data || []).map(item => {
                  return (<Select.Item label={item.name} value={item.id} key={item.id} />)
                })
            }

          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Voting System  is required.
          </FormControl.ErrorMessage>
        </FormControl>
        <Button mt="2" isDisabled={state.isButtonDisabled} onPress={handleCreateGame} >
          Create a new Game
        </Button>

      </VStack>
    </Box>
  </Center>);
}
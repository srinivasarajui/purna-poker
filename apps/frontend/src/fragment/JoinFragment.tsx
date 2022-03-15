import { Box, Heading, VStack, FormControl, Input, Button, Center, HStack, Text, WarningOutlineIcon } from "native-base";

import React from "react";
enum JoinGameActions {
  CHANGE_USER_NAME = 'changeUserName',
  CHANGE_GAME_CODE = 'changeGameCode',
  CHANGE_ADMIN_CODE = 'changeAdminCode',

}
interface JoinGameAction {
  type: JoinGameActions;
  payload: string;
}

interface JoinGameState {
  userName: string;
  gameCode: string;
  adminCode: string;
  isUserNameValid: boolean;
  isGameCodeValid: boolean;
  isButtonDisabled: boolean;
}

function JoinGameReducer(state: JoinGameState, action: JoinGameAction) {
  const { type, payload } = action;
  const nextState: JoinGameState = { ...state };
  switch (type) {
    case JoinGameActions.CHANGE_USER_NAME:
      nextState.userName = payload;
      nextState.isUserNameValid= payload.length === 0 ;

      break;
    case JoinGameActions.CHANGE_GAME_CODE:
      nextState.gameCode = payload;
      nextState.isGameCodeValid= !payload.match(/^[0-9a-fA-F]{24}$/);
      break
    case JoinGameActions.CHANGE_ADMIN_CODE:
     nextState.adminCode = payload;
  }
  nextState.isButtonDisabled =  !(nextState.userName.trim().length > 0 && nextState.gameCode.trim().length > 0 && nextState.gameCode.match(/^[0-9a-fA-F]{24}$/));
  return nextState;
}
export function JoinFragment(){
  const [state, dispatch] = React.useReducer(JoinGameReducer, {
    userName: '',
    gameCode: '',
    adminCode: '',
    isUserNameValid: false,
    isGameCodeValid: false,
    isButtonDisabled: true,
  });
  return (<Center w="100%">
    <Box  p="2" w="90%"  py="8">
      <Heading size="lg" fontWeight="semibold">
        Join an existing game
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={state.isUserNameValid}>
          <FormControl.Label><Text>User name</Text></FormControl.Label>
          <Input value={state.userName} onChangeText={itemValue => dispatch({type: JoinGameActions.CHANGE_USER_NAME,  payload:itemValue })}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              User name is required.
            </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={state.isGameCodeValid}>
          <FormControl.Label>Game code</FormControl.Label>
          <Input value={state.gameCode} onChangeText={itemValue => dispatch({type: JoinGameActions.CHANGE_GAME_CODE,  payload:itemValue })}/>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Game code is not in correct format.
            </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>

          <FormControl.Label>Admin Code(optional)</FormControl.Label>
          <Input type="password" value={state.adminCode} onChangeText={itemValue => dispatch({type: JoinGameActions.CHANGE_ADMIN_CODE,  payload:itemValue })}/>

        </FormControl>
        <Button mt="2"  isDisabled={state.isButtonDisabled} >
          Go to Game
        </Button>


      </VStack>
    </Box>
  </Center>);
}

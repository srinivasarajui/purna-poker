import React, { useState } from "react";
import { Button, Center, HStack, Modal, Text, Switch } from "native-base";
import QRCode from 'react-native-qrcode-svg';
import { Game } from "backend";
export interface IGameDetailsPopupProps{
  showModal:boolean
  game?:Game
  closeModel:()=>void
}
export function GameDetailsPopup(props: IGameDetailsPopupProps){
  const [displayMode,setDisplayMode]= useState('user');
  return (<Modal isOpen={props.showModal} onClose={() => props.closeModel()}>
    <Modal.Content maxWidth="400px">
      <Modal.Header>Game codes</Modal.Header>
      <Modal.Body>
        <Center>
        <QRCode
            value={displayMode === 'admin' ? `https://psp.cisne.in/load/${props?.game?.id}/${props?.game?.adminCode}` : `https://psp.cisne.in/load/${props?.game?.id}`}
          size={250}
        />
          <HStack space={2} alignItems="center">
            <Text>User</Text>
            <Switch onToggle={() => setDisplayMode(displayMode === 'admin' ? 'user' : 'admin')} isChecked={displayMode === 'admin'}/>
            <Text >Admin</Text>
          </HStack>
        </Center>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button onPress={() => {
            props.closeModel()
          }}>
            Go To Game
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>);

}
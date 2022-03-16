import React, { useState } from "react";
import { Button, Center, Modal, TextArea } from "native-base";
import { Game } from "backend";
export interface IStoryManagePopupProps {
  showModal: boolean
  storyDesc: string
  onClose: () => void
  onAction: (desc: string) => void
}
export function StoryManagePopup(props: IStoryManagePopupProps) {
  // const [storyDesc, setStoryDesc] = useState(props.storyDesc);
  return (<Modal isOpen={props.showModal} onClose={props.onClose()} >
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>Story Description</Modal.Header>
      <Modal.Body>
        <Center>
          <TextArea h={20} placeholder="Story description" w="75%" maxW="300" />
        </Center>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button >
            Go To Game
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>);

}
import { useState } from 'react';
import Modal from '../common/Modal';

export interface ITextInputPopupProps {
  isOpen: boolean;
  initialText: String;
  placeHolder: string;
  onAction: (isSaved: boolean, text: String) => void;
}

export function TextInputPopup(props: ITextInputPopupProps) {
  const { isOpen, initialText, placeHolder, onAction } = props;
  const [text, setText] = useState(initialText.toString());
  const onModalAction = (code: string) => {
    onAction(code === 'Accept', text);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        showAccept
        acceptButtonText="save"
        closeButtonText="cancel"
        onActionClick={onModalAction}
        disableAcceptButton={text.trim().length === 0}
      >
        <textarea
          data-testid="input-popup-textarea"
          placeholder={placeHolder}
          className="w-full pr-16 textarea textarea-bordered"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Modal>
    </div>
  );
}

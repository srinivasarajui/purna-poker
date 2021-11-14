import { FunctionComponent, PropsWithChildren } from 'react';

type ModalProps = {
  isOpen: boolean;
  disableAcceptButton?: boolean;
  disableCloseButton?: boolean;
  showAccept?: boolean;
  acceptButtonText?: string;
  closeButtonText?: string;
  onActionClick: (code: string) => void;
};
const defaultProps = {
  showAccept: false,
  disableAcceptButton: false,
  disableCloseButton: false,
  acceptButtonText: 'Accept',
  closeButtonText: 'Close',
};
const Modal: FunctionComponent<ModalProps> = (props: PropsWithChildren<ModalProps>) => {
  const classValue = `modal ${props.isOpen ? 'modal-open' : ''}`;
  return (
    <div id="modal" className={classValue}>
      <div className="modal-box">
        {props.children}
        <div className="modal-action">
          <button
            data-testid="modal-close"
            disabled={props.disableCloseButton}
            type="button"
            className="btn"
            onClick={() => props.onActionClick('Close')}
          >
            {props.closeButtonText}
          </button>
          {props.showAccept && (
            <button
              data-testid="modal-accept"
              disabled={props.disableAcceptButton}
              type="button"
              className="btn btn-primary"
              onClick={() => props.onActionClick('Accept')}
            >
              {props.acceptButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
Modal.defaultProps = defaultProps;
export default Modal;

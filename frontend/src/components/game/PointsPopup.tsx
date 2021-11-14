import { useEffect, useState } from 'react';

import Modal from '../common/Modal';
import { Points } from '../../data/gql';

export interface IPointsPopupProps {
  isOpen: boolean;
  initialValue: number;
  points: Points[] | undefined;
  onAction: (isSaved: boolean, value: number) => void;
}

export function PointsPopup(props: IPointsPopupProps) {
  const points = props.points || [];
  const [value, setValue] = useState(props.initialValue);
  useEffect(() => {
    setValue(props.initialValue);
  }, [props.initialValue]);
  const onModalAction = (code: string) => {
    props.onAction(code === 'Accept', value);
  };

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        showAccept
        acceptButtonText="save"
        closeButtonText="cancel"
        onActionClick={onModalAction}
      >
        <select
          className="w-full max-w-xs select select-bordered"
          onChange={(event) => setValue(+event.target.value)}
          value={value}
          data-testid="points-popup-select"
        >
          {points
            .filter((point) => point.storyPoints > 0)
            .map((point) => (
              <option key={point.storyPoints} value={point.storyPoints}>
                {point.displayText}
              </option>
            ))}
        </select>
      </Modal>
    </div>
  );
}

import ReactCardFlip from './ReactCardFlip';

export interface IPointsDisplayCardProps {
  name: String;
  isCardOpen?: boolean;
  storyPoints: number;
  didVote: boolean;
  didLogin: boolean;
  didGameStart: boolean;
  getDisplay: (id: number) => String | undefined;
}

export function PointsDisplayCard(props: IPointsDisplayCardProps) {
  let displayText;
  let style = '';
  if (props.didGameStart) {
    if (!props.didLogin) {
      displayText = 'Offline';
    } else {
      if (!props.didVote) {
        displayText = 'Waiting';
      } else {
        displayText = 'Ready';
      }
    }
  } else {
    displayText = props.didLogin ? 'Online' : 'Offline';
  }
  return (
    <ReactCardFlip isFlipped={!props.isCardOpen}>
      <div className="w-full shadow stats">
        <div className="stat place-items-center place-content-center">
          <div className="stat-title" data-testid="pointsdisplay-name">
            {props.name}
          </div>
          <div className={'stat-value ' + style} data-testid="pointsdisplay-points">
            {props.getDisplay(props.storyPoints) || 'Not voted'}
          </div>
        </div>
      </div>
      <div className="w-full shadow stats">
        <div className="stat place-items-center place-content-center">
          <div className="stat-title" data-testid="pointsdisplay-name">
            {props.name}
          </div>
          <div className={'stat-value ' + style} data-testid="pointsdisplay-points">
            {displayText}
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
}

export interface IPointsDisplayCardProps {
  name: String;
  isCardOpen?: boolean;
  storyPoints: number;
  didVote: boolean;
  didLogin: boolean;
  getDisplay: (id: number) => String | undefined;
}

export function PointsDisplayCard(props: IPointsDisplayCardProps) {
  let displayText;
  let style = '';
  if (!props.didLogin) {
    displayText = 'Offline';
  } else if (!props.didVote) {
    displayText = 'Waiting';
    style = 'animate-pulse';
  } else if ((props.storyPoints >= 0 && props.isCardOpen) || props.storyPoints < 0) {
    displayText = props.getDisplay(props.storyPoints);
  } else {
    displayText = 'Ready';
  }

  return (
    <div className="shadow stats">
      <div className="stat place-items-center place-content-center">
        <div className="stat-title" data-testid="pointsdisplay-name">
          {props.name}
        </div>
        <div className={'stat-value ' + style} data-testid="pointsdisplay-points">
          {displayText}
        </div>
      </div>
    </div>
  );
}

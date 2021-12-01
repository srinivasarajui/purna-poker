import { Points } from '../../data/gql';

export interface IStoryPointButtonsProps {
  currentPoints: number;
  points: Points[];
  canVote: boolean;
  buttonClicked: (_type: number) => void;
}

function getCss(category: String): String {
  if (category === 'GREEN') {
    return ' btn-success ';
  } else if (category === 'RED') {
    return ' btn-secondary ';
  } else {
    return ' btn-info ';
  }
}
export function StoryPointButtons(props: IStoryPointButtonsProps) {
  return (
    <div>
      <div>
        {props.points.map((point) => (
          <button
            type="button"
            disabled={!props.canVote}
            data-testid={'story-point-buttons-' + point.storyPoints}
            key={point.storyPoints}
            className={`transform text-lg btn-lg btn-square ${props.canVote ? 'hover:scale-110' : ''} ${
              point.storyPoints === props.currentPoints ? ' btn-error ' : getCss(point.category)
            }`}
            onClick={() => props.buttonClicked(point.storyPoints)}
          >
            {point.displayText.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

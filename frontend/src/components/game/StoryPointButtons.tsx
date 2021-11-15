import { Points } from '../../data/gql';

export interface IStoryPointButtonsProps {
  currentPoints: number;
  points: Points[];
  buttonClicked: (_type: number) => void;
}

function getCss(category: String): String {
  if (category === 'GREEN') {
    return 'btn-success';
  } else if (category === 'RED') {
    return 'btn-warning';
  } else {
    return 'btn-info';
  }
}
export function StoryPointButtons(props: IStoryPointButtonsProps) {
  return (
    <div>
      {props.points.map((point) => (
        <button
          type="button"
          data-testid={'storypointbuttons-' + point.storyPoints}
          key={point.storyPoints}
          className={`text-lg btn-lg btn-square ${
            point.storyPoints === props.currentPoints ? 'btn-secondary' : getCss(point.category)
          }`}
          onClick={() => props.buttonClicked(point.storyPoints)}
        >
          {point.displayText.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

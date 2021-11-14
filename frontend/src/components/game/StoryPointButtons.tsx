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
    <div className="btn-group">
      {props.points.map((point) => (
        <button
          type="button"
          data-testid={'storypointbuttons-' + point.storyPoints}
          key={point.storyPoints}
          className={`btn btn-xs sm:btn-sm md:btn lg:btn-lg ${
            point.storyPoints === props.currentPoints ? 'btn-active' : getCss(point.category)
          }`}
          onClick={() => props.buttonClicked(point.storyPoints)}
        >
          {point.displayText.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

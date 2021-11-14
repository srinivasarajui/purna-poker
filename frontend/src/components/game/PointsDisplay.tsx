import { Participant, Story } from '../../data/types';

import { PointsDisplayCard } from './PointsDisplayCard';

export interface IPointsDisplayProps {
  story?: Story;
  participants: Participant[];
  getDisplay: (id: number) => String | undefined;
}

export function PointsDisplay(props: IPointsDisplayProps) {
  const unVotedUsers: Participant[] = props.story
    ? props.participants.filter(
        (v) => props.story?.participantEstimations.filter((p) => p.name === v.name).length === 0
      )
    : props.participants;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {props.story &&
          props.story.participantEstimations.map((pe) => (
            <PointsDisplayCard
              name={pe.name}
              getDisplay={props.getDisplay}
              key={pe.name.toString()}
              isCardOpen={props.story?.areCardsOpen}
              storyPoints={pe.storyPoints}
              didLogin={true}
              didVote
            />
          ))}
        {unVotedUsers.map((user) => (
          <PointsDisplayCard
            getDisplay={props.getDisplay}
            name={user.name}
            key={user.name.toString()}
            isCardOpen={props.story?.areCardsOpen}
            didLogin={user.isConnected}
            storyPoints={-3}
            didVote={false}
          />
        ))}
      </div>
    </div>
  );
}

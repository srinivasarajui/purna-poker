import { Game, Story } from './types';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { getWsURL } from './urlUtil';

const statusMap = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Connected',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

export default function useGameSocket(userName: String, gameId: String) {
  const socketUrl = `${getWsURL()}/${userName}/${gameId}`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl, {
    shouldReconnect: () => true,
  });
  const [game, setGame] = useState<Game>();
  const [story, setStory] = useState<Story>();
  const [statusCode, setStatusCode] = useState<String>();
  const [storyPointsSelected, setStoryPointsSelected] = useState(-3);
  useEffect(() => {
    if (lastJsonMessage !== null) {
      const g = lastJsonMessage as Game;
      setGame(g);
      const s = g.stories.find((s1) => s1.id === g.currentStoryId);
      setStory(s);
      const pe = s?.participantEstimations.find((p) => p.name === userName);
      setStoryPointsSelected(!pe ? -3 : pe?.storyPoints);
    }
  }, [lastJsonMessage, setGame, setStory, userName]);
  useEffect(() => setStatusCode(statusMap[readyState]), [readyState]);
  return { sendJsonMessage, game, story, storyPointsSelected, statusCode };
}

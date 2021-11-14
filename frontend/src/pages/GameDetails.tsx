import { useLocation } from 'react-router';
import { GameDetailComp } from '../components/game/GameDetailComponents';
import { useRouter } from '../data/routerUtil';
interface GameProps {
  id: string;
  userName: string;
}

export default function GameDetails() {
  const { state } = useLocation<GameProps>();
  const { goToLandingPage } = useRouter();
  if (!state || !state.id) {
    goToLandingPage();
    return <>Should redirect </>;
  } else {
    return <GameDetailComp gameId={state.id} userName={state.userName} />;
  }
}

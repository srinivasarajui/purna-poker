import { useHistory } from 'react-router';

export function useRouter() {
  const history = useHistory();
  const goToLandingPage = () => {
    history.push({ pathname: '/' });
  };
  const goToGamePage = (gameID: String, userName: String) => {
    history.push({ pathname: '/game', state: { id: gameID, userName } });
  };
  return { goToLandingPage, goToGamePage };
}

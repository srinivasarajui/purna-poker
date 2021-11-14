import { CreateGame } from '../components/landing/CreateGame';
import { LaunchGame } from '../components/landing/LaunchGame';

function Landing() {
  return (
    <>
      <div className="flex flex-col w-full md:flex-row">
        <LaunchGame />
        <div className="divider md:divider-vertical">OR</div>
        <CreateGame />
      </div>
    </>
  );
}

export default Landing;

import ExitIcon from '../../icons/ExitIcon';
import { Link } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import { ThemeSwitch } from './ThemeSwitch';
import { matchPath } from 'react-router';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

function NavBar() {
  const { statusCode } = useContext(SocketContext);

  const isGamePage = matchPath(useLocation().pathname, {
    path: '/game',
    exact: true,
    strict: false,
  });
  return (
    <div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content">
      <div className="px-2 mx-2 navbar-start">
        <span className="text-lg font-bold" data-testid="navbar-title">
          Purna Poker
        </span>
      </div>
      <div className="hidden px-2 mx-2 navbar-center lg:flex">
        <div className="flex items-stretch">
          {isGamePage && (
            <div className="px-4 mx-8 indicator place-items-center">
              <div
                id="game-header-status-indicator"
                className={`indicator-item indicator-middle indicator-start badge ${
                  statusCode === 'Connected' ? 'badge-accent' : 'badge-secondary'
                }`}
              />
              <div className="place-items-center" data-testid="game-header-status-text">
                {statusCode}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="space-x-4 navbar-end">
        <div className="hidden badge badge-warning sm:visible">Alpha Version</div>
        <ThemeSwitch />
        {isGamePage && (
          <div>
            <Link to="/" className="btn btn-square btn-ghost" data-testid="navbar-exit">
              <ExitIcon />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

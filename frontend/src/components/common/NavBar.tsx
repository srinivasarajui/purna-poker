import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';
import ExitIcon from '../../icons/ExitIcon';

function NavBar() {
  const match = matchPath(useLocation().pathname, {
    path: '/',
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
        <div className="flex items-stretch" />
      </div>
      <div className="space-x-4 navbar-end">
        <div className="badge badge-warning">Alpha Version</div>
        {!match && (
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

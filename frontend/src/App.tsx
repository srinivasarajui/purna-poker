import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';
import GameDetails from './pages/GameDetails';
import Landing from './pages/Landing';
import { Load } from './pages/Load';
import NavBar from './components/common/NavBar';
import { clientGQL } from './data/gql';

function App() {
  return (
    <Router>
      <div className="flex flex-col md:min-h-screen">
        <NavBar />
        <main className="flex-grow px-2 py-1 md:py-6 mg:px-6 ">
          <ApolloProvider client={clientGQL}>
            <Switch>
              <Route path="/load/:gid/:adminCode" children={<Load />} />
              <Route path="/load/:gid" children={<Load />} />
              <Route path="/game">
                <GameDetails />
              </Route>
              <Route path="/">
                <Landing />
              </Route>
            </Switch>
          </ApolloProvider>
        </main>
        <footer className="p-4 footer bg-base-300 text-base-content footer-center">
          <div>
            <p>Dedicated to my mother - Srini</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

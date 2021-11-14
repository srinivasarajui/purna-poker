import * as hooks from '../data/routerUtil';

import { render, screen } from '@testing-library/react';

import GameDetails from './GameDetails';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';

describe('GameDetails testing', () => {
  test('Basic check', async () => {
    const mockGoToGamePage = jest.fn((gameID: String, userName: String) => {});
    const mockGoToHomePage = jest.fn(() => {});
    jest.spyOn(hooks, 'useRouter').mockImplementation(() => ({
      goToGamePage: mockGoToGamePage,
      goToLandingPage: mockGoToHomePage,
    }));
    const mocks: any[] = [];
    render(
      <MemoryRouter initialEntries={[{ pathname: '/game' }]}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <GameDetails />
        </MockedProvider>
      </MemoryRouter>
    );
    //const or = screen.queryByText('OR');
    //expect(or).toBeInTheDocument();
  });
});

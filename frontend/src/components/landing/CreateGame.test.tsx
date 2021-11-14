import * as hooks from '../../data/routerUtil';

import { NEW_GAME, QUERY_VOTING_SYSTEMS } from '../../data/gql';
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { CreateGame } from './CreateGame';
import { MockedProvider } from '@apollo/client/testing';

describe('CreateGame testing', () => {
  test('Disable check', async () => {
    const mocks: any[] = [];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CreateGame />
      </MockedProvider>
    );
    const button = screen.getByTestId('landing-newgame') as HTMLButtonElement;
    expect(button).toBeDisabled();
  });

  test('Valid Flow', async () => {
    const mockGoToGamePage = jest.fn((gameID: String, userName: String) => {});
    const mockGoToHomePage = jest.fn(() => {});
    jest.spyOn(hooks, 'useRouter').mockImplementation(() => ({
      goToGamePage: mockGoToGamePage,
      goToLandingPage: mockGoToHomePage,
    }));
    const mocks: any[] = [
      {
        request: {
          query: QUERY_VOTING_SYSTEMS,
        },
        result: {
          loading: false,
          data: {
            votingSystems: [
              {
                displayText: 'ABCD',
                code: 'abcd',
              },
            ],
          },
        },
      },
      {
        request: {
          query: NEW_GAME,
          variables: { name: 'NEW Game', code: 'abcd' },
        },
        result: {
          loading: false,
          data: {
            newGame: {
              name: 'New Game',
              idString: 'idString',
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <CreateGame />
      </MockedProvider>
    );

    let button = screen.getByTestId('landing-newgame') as HTMLButtonElement;
    expect(button).toBeDisabled();
    await waitForElementToBeRemoved(() => screen.queryByText('Loading options'));
    const userNameTxt = screen.getByTestId('create-game-username') as HTMLInputElement;
    fireEvent.change(userNameTxt, { target: { value: 'NEW User' } });
    const gameDescTxt = screen.getByTestId('create-game-name') as HTMLTextAreaElement;
    fireEvent.change(gameDescTxt, { target: { value: 'NEW Game' } });
    const votingSelect = screen.getByTestId('create-game-voting-system') as HTMLSelectElement;
    fireEvent.change(votingSelect, { target: { value: 'abcd' } });
    expect(button).not.toBeDisabled();
    act(() => button.click());
    const closeButton = screen.getByTestId('modal-close') as HTMLButtonElement;
    expect(closeButton).toBeDisabled();
    await waitForElementToBeRemoved(() => screen.queryByText('Game is being Generated'));
    expect(closeButton).not.toBeDisabled();
    closeButton.click();
    expect(mockGoToGamePage.mock.calls.length).toBe(1);
  });
});

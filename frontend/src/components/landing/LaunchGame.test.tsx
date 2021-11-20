import * as data from '../../data/gql';
import * as hooks from '../../data/routerUtil';

import { act, fireEvent, render, screen } from '@testing-library/react';

import { LaunchGame } from './LaunchGame';

describe('LaunchGame testing', () => {
  test('Disable check', async () => {
    render(<LaunchGame />);
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).toBeDisabled();
  });
  test('check correct entry', async () => {
    const mockGoToGamePage = jest.fn((gameID: String, userName: String) => {});
    const mockGoToHomePage = jest.fn(() => {});
    jest.spyOn(hooks, 'useRouter').mockImplementation(() => ({
      goToGamePage: mockGoToGamePage,
      goToLandingPage: mockGoToHomePage,
    }));
    const mockAddParticipantMutation = jest.fn(async (gameId: String) => true);
    jest.spyOn(data, 'addParticipantMutation').mockImplementation(mockAddParticipantMutation);
    render(<LaunchGame />);
    const name = screen.getByTestId('launch-game-username') as HTMLInputElement;
    fireEvent.change(name, { target: { value: 'Sample' } });
    let button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).toBeDisabled();
    const code = screen.getByTestId('launch-game-code') as HTMLInputElement;
    fireEvent.change(code, { target: { value: '618dddd2132bf475bc833b8d' } });
    button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).not.toBeDisabled();
    await act(async () => button.click());
    //await new Promise((r) => setTimeout(r, 2000));
    expect(mockGoToGamePage.mock.calls.length).toBe(1);
  });
  test('check wrong entry', async () => {
    const mockGoToGamePage = jest.fn((gameID: String, userName: String) => {});
    const mockGoToHomePage = jest.fn(() => {});
    jest.spyOn(hooks, 'useRouter').mockImplementation(() => ({
      goToGamePage: mockGoToGamePage,
      goToLandingPage: mockGoToHomePage,
    }));
    const mockAddParticipantMutation = jest.fn(async (gameId: String) => false);
    jest.spyOn(data, 'addParticipantMutation').mockImplementation(mockAddParticipantMutation);
    render(<LaunchGame />);
    const name = screen.getByTestId('launch-game-username') as HTMLInputElement;
    fireEvent.change(name, { target: { value: 'Sample' } });
    let button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).toBeDisabled();
    const code = screen.getByTestId('launch-game-code') as HTMLInputElement;
    fireEvent.change(code, { target: { value: '618dddd2132bf475bc833b8d' } });
    button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).not.toBeDisabled();
    await act(async () => button.click());
    //await new Promise((r) => setTimeout(r, 2000));
    expect(mockAddParticipantMutation.mock.calls.length).toBe(1);
    expect(mockGoToGamePage.mock.calls.length).toBe(0);
    button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).toBeDisabled();
  });
});

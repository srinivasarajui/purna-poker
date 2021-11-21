import { render, screen } from '@testing-library/react';

import { Game } from '../../data/types';
import { GameHeader } from './GameHeader';
import { act } from 'react-dom/test-utils';

describe('GameHeader testing', () => {
  let game: Game;
  let mockCallback: jest.Mock<any, [x: any]>;
  beforeEach(() => {
    game = {
      idString: 'id',
      name: 'name',
      adminCode: 'code',
      stories: [
        {
          description: 'description',
          id: 'id',
          isEstimated: true,
          storyPoints: 1,
          participantEstimations: [],
          areCardsOpen: true,
        },
      ],
      participants: [],
      didGameStart: false,
      controllerName: '',
      currentStoryId: '',
    };
    mockCallback = jest.fn((x) => x);
  });
  test('List statusCode connection', async () => {
    render(<GameHeader game={game} sendJsonMessage={mockCallback} userName="sample" isAdmin={true} />);
    const btn = screen.getByTestId('game-header-start');
    expect(btn).toHaveTextContent('Start the Game');
    act(() => btn.click());
    expect(mockCallback).toHaveBeenCalledWith({ code: 'startGame', text: 'sample' });
  });
  test('List statusCode not connection', async () => {
    game.didGameStart = true;
    render(<GameHeader game={game} sendJsonMessage={mockCallback} userName="sample" isAdmin={true} />);
    const btn = screen.getByTestId('game-header-stop');
    expect(btn).toHaveTextContent('Stop the Game');
    act(() => btn.click());
    expect(mockCallback).toHaveBeenCalledWith({ code: 'stopGame'});
  });
});

import { render, screen } from '@testing-library/react';

import { Game } from '../../data/types';
import { GameHeader } from './GameHeader';

describe('GameHeader testing', () => {
  let game: Game;
  let mockCallback: jest.Mock<any, [x: any]>;
  beforeEach(() => {
    game = {
      idString: 'id',
      name: 'name',
      stories: [],
      participants: [],
      didGameStart: false,
      controllerName: '',
      currentStoryId: '',
    };
    mockCallback = jest.fn((x) => x);
  });
  test('List statusCode connection', async () => {
    render(<GameHeader game={game} sendJsonMessage={mockCallback} statusCode="Connected" userName="sample" />);
    //const indicator = screen.getByTestId('game-header-status-indicator');
    //expect(indicator.style).toContain('badge-success');
  });
  test('List statusCode not connection', async () => {
    game.didGameStart = true;
    render(<GameHeader game={game} sendJsonMessage={mockCallback} statusCode="Not Connected" userName="sample" />);
    //const indicator = screen.getByTestId('game-header-status-indicator');
    //expect(indicator.style).toContain('badge-success');
  });
});

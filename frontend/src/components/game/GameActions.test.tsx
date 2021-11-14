import { render, screen } from '@testing-library/react';

import { GameActions } from './GameActions';

describe('GameActions testing', () => {
  [
    { buttonId: 'game-actions-previous-story', code: 'moveToPreviousStory' },
    { buttonId: 'game-actions-next-story', code: 'moveToNextStory' },
    { buttonId: 'game-actions-flip', code: 'flipPoints' },
    { buttonId: 'game-actions-reset', code: 'resetPoints' },
  ].map((item) =>
    test('GameActions previous story check', async () => {
      const mockCallback = jest.fn((x) => x);
      render(<GameActions id="Sample" sendJsonMessage={mockCallback} disableFlip={false} />);
      const sp = screen.getByTestId(item.buttonId);
      sp.click();
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0].code).toBe(item.code);
    })
  );
});

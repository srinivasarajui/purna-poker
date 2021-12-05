import { render, screen } from '@testing-library/react';

import React from 'react';
import { StoryPointButtons } from './StoryPointButtons';

describe('Story Point Buttons testing', () => {
  const fib = [
    { storyPoints: 1, displayText: '1', category: 'GREEN' },
    { storyPoints: 2, displayText: '2', category: 'GREEN' },
    { storyPoints: 3, displayText: '3', category: 'GREEN' },
    { storyPoints: 5, displayText: '5', category: 'GREEN' },
    { storyPoints: 8, displayText: '8', category: 'GREEN' },
    { storyPoints: 13, displayText: '13', category: 'GREEN' },
    { storyPoints: 21, displayText: '21', category: 'RED' },
    { storyPoints: 43, displayText: '43', category: 'RED' },
    { storyPoints: -1, displayText: '?', category: 'QUESTION' },
    { storyPoints: -2, displayText: 'pass', category: 'QUESTION' },
  ];
  test('Validate Test', async () => {
    const mockCallback = jest.fn((x) => x);
    render(<StoryPointButtons canVote={true} currentPoints={8} buttonClicked={mockCallback} points={fib} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(10);
    const button = screen.getByTestId('story-point-buttons-1');
    button.click();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(1);
  });
});

import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { StoryLevelPointsCard } from './StoryLevelPointsCard';

describe('StoryLevelPointsCard testing', () => {
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
  test('Validate Display', async () => {
    const mockCallback = jest.fn((x) => x);
    const mockDisplayFun = jest.fn((x) => 'FUN' + x);
    render(
      <StoryLevelPointsCard
        getDisplay={mockDisplayFun}
        storyPoints={5}
        showPoints={true}
        sendJsonMessage={mockCallback}
        points={fib}
      />
    );
    const sp = screen.getByTestId('points-card-story-points');
    expect(sp.innerHTML).toBe('FUN5');
    const button = screen.getByText('Manual over Ride');
    expect(button).toBeInTheDocument();
    button.click();
    fireEvent.change(screen.getByTestId('points-popup-select'), { target: { value: 3 } });

    const okButton = screen.getByTestId('modal-accept');
    okButton.click();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].code).toBe('updatePoints');
    expect(mockCallback.mock.calls[0][0].points).toBe(3);
  });
  test('Validate Points change cancel', async () => {
    const mockCallback = jest.fn((x) => x);
    const mockDisplayFun = jest.fn((x) => 'FUN' + x);
    render(
      <StoryLevelPointsCard
        getDisplay={mockDisplayFun}
        storyPoints={8}
        showPoints={true}
        points={fib}
        sendJsonMessage={mockCallback}
      />
    );
    const button = screen.getByText('Manual over Ride');
    expect(button).toBeInTheDocument();
    button.click();
    //const option = screen.getByDisplayValue('5');
    //fireEvent.click(option);
    fireEvent.change(screen.getByTestId('points-popup-select'), { target: { value: 5 } });
    const cancelButton = screen.getByTestId('modal-close');
    cancelButton.click();
    expect(mockCallback.mock.calls.length).toBe(0);
  });
  test('Validate hidden', async () => {
    const mockCallback = jest.fn((x) => x);
    const mockDisplayFun = jest.fn((x) => 'FUN' + x);
    render(
      <StoryLevelPointsCard
        getDisplay={mockDisplayFun}
        storyPoints={8}
        showPoints={false}
        sendJsonMessage={mockCallback}
      />
    );
    const sp = screen.getByTestId('points-card-story-points');
    expect(sp.innerHTML).toBe('Flip');
    // const button = screen.queryByRole('button');
    // expect(button).toBeNull();
  });
});

import { Participant, Story } from '../../data/types';
import { render, screen } from '@testing-library/react';

import { PointsDisplay } from './PointsDisplay';

describe('PointsDisplay testing', () => {
  let getDisplay: (id: number) => String | undefined;

  beforeEach(() => {
    getDisplay = jest.fn((x) => x.toString());
  });

  test('List check', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      participantEstimations: [],
      areCardsOpen: true,
    };
    const participants: Participant[] = [
      { name: 'User1', isConnected: true },
      { name: 'User2', isConnected: true },
      { name: 'User3', isConnected: false },
    ];
    render(<PointsDisplay story={story} participants={participants} getDisplay={getDisplay} />);
    const sp = screen.queryAllByTestId('pointsdisplay-name');
    expect(sp.length).toBe(3);
  });

  test('Participant matched check', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      participantEstimations: [{ name: 'User1', storyPoints: 8 }],
      areCardsOpen: true,
    };
    const participants: Participant[] = [
      { name: 'User1', isConnected: true },
      { name: 'User2', isConnected: true },
      { name: 'User3', isConnected: false },
    ];
    render(<PointsDisplay story={story} participants={participants} getDisplay={getDisplay} />);
    const sp = screen.queryAllByTestId('pointsdisplay-name');
    expect(sp.length).toBe(3);
  });

  test('Empty check', async () => {
    const participants: Participant[] = [
      { name: 'User1', isConnected: true },
      { name: 'User2', isConnected: true },
      { name: 'User3', isConnected: false },
    ];
    render(<PointsDisplay story={undefined} participants={participants} getDisplay={getDisplay} />);
    const sp = screen.queryAllByTestId('pointsdisplay-name');
    expect(sp.length).toBe(3);
  });
});

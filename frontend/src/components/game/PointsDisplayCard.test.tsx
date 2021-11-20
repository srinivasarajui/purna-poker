import { render, screen } from '@testing-library/react';

import { PointsDisplayCard } from './PointsDisplayCard';

describe('PointsDisplayCard testing', () => {
  let getDisplay: (id: number) => String | undefined;

  beforeEach(() => {
    getDisplay = jest.fn((x) => x.toString());
  });
  test('Validate Display when opened voted', async () => {
    render(
      <PointsDisplayCard
        didGameStart={true}
        getDisplay={getDisplay}
        name="Sample"
        isCardOpen={true}
        storyPoints={5}
        didVote={true}
        didLogin={true}
      />
    );
    const sp = screen.getByTestId('pointsdisplay-name');
    expect(sp.innerHTML).toBe('Sample');
    const points = screen.getByTestId('pointsdisplay-points');
    expect(points.innerHTML).toBe('5');
  });
  test('Validate Display when not opened voted', async () => {
    render(
      <PointsDisplayCard
        didGameStart={true}
        getDisplay={getDisplay}
        name="Sample"
        isCardOpen={false}
        storyPoints={5}
        didVote={true}
        didLogin={true}
      />
    );
    const points = screen.getByTestId('pointsdisplay-points');
    expect(points.innerHTML).toBe('Ready');
  });
  test('Validate Display when  opened not voted', async () => {
    render(
      <PointsDisplayCard
        didGameStart={true}
        getDisplay={getDisplay}
        name="Sample"
        isCardOpen={false}
        storyPoints={5}
        didVote={true}
        didLogin={true}
      />
    );
    const points = screen.getByTestId('pointsdisplay-points');
    expect(points.innerHTML).toBe('Ready');
  });

  test('Validate Display not logged in', async () => {
    render(
      <PointsDisplayCard
        getDisplay={getDisplay}
        name="Sample"
        isCardOpen={false}
        storyPoints={5}
        didLogin={false}
        didVote={false}
      />
    );
    const points = screen.getByTestId('pointsdisplay-points');
    expect(points.innerHTML).toBe('Offline');
  });
});

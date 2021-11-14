import React from 'react';
import { render, screen } from '@testing-library/react';
import { Story } from '../../data/types';
import { StoriesList } from './StoriesList';

describe('StoryCard testing', () => {
  test('Empty list', async () => {
    const stories = [] as Story[];
    render(<StoriesList stories={stories} sendJsonMessage={() => false} />);
    const list = screen.queryAllByTestId('story-points');
    expect(list.length).toEqual(0);
  });
  test('one item in list', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      participantEstimations: [],
      areCardsOpen: true,
    };
    const stories = [story];
    render(<StoriesList stories={stories} sendJsonMessage={() => false} />);
    const list = screen.queryAllByTestId('story-points');
    expect(list.length).toEqual(1);
  });
});

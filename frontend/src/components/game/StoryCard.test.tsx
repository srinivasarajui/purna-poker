import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import { Story } from '../../data/types';
import StoryCard from './StoryCard';

describe('StoryCard testing', () => {
  let getDisplay: (id: number) => String | undefined;

  beforeEach(() => {
    getDisplay = jest.fn((x) => x.toString());
  });
  test('Open & Estimated scenario', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: true,
      storyPoints: 5,
      areCardsOpen: true,
      participantEstimations: [],
    };

    render(
      <StoryCard isActive={true} isAdmin={true} story={story} sendJsonMessage={() => false} getDisplay={getDisplay} />
    );
    const desc = screen.getByTestId('story-description');
    expect(desc).toBeInTheDocument();
    expect(desc.innerHTML).toEqual('Sample Desc');
    const sp = screen.getByTestId('story-points');
    expect(sp).toBeInTheDocument();
    expect(sp.innerHTML).toEqual('Estimated Points :5');
  });
  test('Open & un Estimated scenario', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      areCardsOpen: true,
      participantEstimations: [],
    };
    render(
      <StoryCard isActive={true} isAdmin={true} story={story} sendJsonMessage={() => false} getDisplay={getDisplay} />
    );
    const sp = screen.getByTestId('story-points');
    expect(sp).toBeInTheDocument();
    expect(sp.innerHTML).toEqual('Not Estimated yet');
  });

  test('Delete Testing', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      areCardsOpen: true,
      participantEstimations: [],
    };
    const mockCallback = jest.fn((x) => x);
    render(
      <StoryCard story={story} sendJsonMessage={mockCallback} isActive={false} isAdmin={true} getDisplay={getDisplay} />
    );
    const button = screen.getByTestId('story-card-story-delete');
    button.click();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].code).toBe('deleteStory');
    expect(mockCallback.mock.calls[0][0].id).toBe('ID1');
  });
  test('update Testing', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      areCardsOpen: true,
      participantEstimations: [],
    };
    const mockCallback = jest.fn((x) => x);
    render(
      <StoryCard isActive={true} isAdmin={true} getDisplay={getDisplay} story={story} sendJsonMessage={mockCallback} />
    );
    const button = screen.getByTestId('story-card-story-edit');
    button.click();
    const textarea = screen.getByTestId('input-popup-textarea');
    fireEvent.change(textarea, { target: { value: 'NEW STORY' } });
    const okButton = screen.getByTestId('modal-accept');
    okButton.click();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].code).toBe('updateStoryDesc');
    expect(mockCallback.mock.calls[0][0].id).toBe('ID1');
    expect(mockCallback.mock.calls[0][0].text).toBe('NEW STORY');
  });
  test('update Testing cancel', async () => {
    const story: Story = {
      description: 'Sample Desc',
      id: 'ID1',
      isEstimated: false,
      storyPoints: 5,
      participantEstimations: [],
      areCardsOpen: true,
    };
    const mockCallback = jest.fn((x) => x);
    render(
      <StoryCard getDisplay={getDisplay} isActive={true} isAdmin={true} story={story} sendJsonMessage={mockCallback} />
    );
    const button = screen.getByTestId('story-card-story-edit');
    button.click();
    const closeButton = screen.getByTestId('modal-close');
    closeButton.click();
    expect(mockCallback.mock.calls.length).toBe(0);
  });
});

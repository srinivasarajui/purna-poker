import { fireEvent, render, screen } from '@testing-library/react';

import StoryManager from './StoryManager';

describe('StoryManager testing', () => {
  test('checking add success', async () => {
    const mockCallback = jest.fn((x) => x);
    render(<StoryManager stories={[]} sendJsonMessage={mockCallback} />);
    const button = screen.getByTestId('story-manager-add-stories') as HTMLButtonElement;
    button.click();
    const textarea = screen.getByTestId('input-popup-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'NEW STORY' } });
    const okButton = screen.getByTestId('modal-accept');
    okButton.click();
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0].code).toBe('addStory');
    expect(mockCallback.mock.calls[0][0].text).toBe('NEW STORY');
  });
  test('checking add cancel', async () => {
    const mockCallback = jest.fn((x) => x);
    render(<StoryManager stories={[]} sendJsonMessage={mockCallback} />);
    const button = screen.getByTestId('story-manager-add-stories') as HTMLButtonElement;
    button.click();
    const textarea = screen.getByTestId('input-popup-textarea') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'NEW STORY' } });
    const cancelButton = screen.getByTestId('modal-close');
    cancelButton.click();
    expect(mockCallback.mock.calls.length).toBe(0);
  });
});

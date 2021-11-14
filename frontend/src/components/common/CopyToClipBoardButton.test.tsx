import { render, screen } from '@testing-library/react';

import CopyToClipBoardButton from './CopyToClipBoardButton';

describe('CopyToClipBoardButton testing', () => {
  test('Basic check', async () => {
    render(<CopyToClipBoardButton text="Sample" showLabel={true} />);
    const sp = screen.getByTestId('copytoclipboard');
    expect(sp.innerHTML).toContain('Copy to clipboard');
  });
  test('Button check', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: (data: string) => data,
      },
    });
    const spy = jest.spyOn(navigator.clipboard, 'writeText');
    render(<CopyToClipBoardButton text="Sample" />);
    const sp = screen.getByTestId('copytoclipboard');
    sp.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

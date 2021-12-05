import { render, screen } from '@testing-library/react';

import CopyToClipBoardButton from './CopyToClipBoardButton';

describe('CopyToClipBoardButton testing', () => {
  test('Basic check', async () => {
    render(<CopyToClipBoardButton copyText="ABCD" displayText="Copy to clipboard" />);
    const sp = screen.getByTestId('copyToClipboard');
    expect(sp.innerHTML).toContain('Copy to clipboard');
  });
  test('Button check', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: (data: string) => data,
      },
    });
    const spy = jest.spyOn(navigator.clipboard, 'writeText');
    render(<CopyToClipBoardButton copyText="ABCD" displayText="Copy to clipboard" />);
    const sp = screen.getByTestId('copyToClipboard');
    sp.click();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

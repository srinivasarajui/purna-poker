import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert testing', () => {
  test('Basic check', async () => {
    render(
      <Alert>
        <div data-testid="alert-inner-text-testing">Testing</div>
      </Alert>
    );
    const sp = screen.getByTestId('alert-inner-text-testing');
    expect(sp.innerHTML).toBe('Testing');
  });
});

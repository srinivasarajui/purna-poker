import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import NavBar from './NavBar';

describe('NavBar testing', () => {
  test('Basic NavBar', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <NavBar />
      </MemoryRouter>
    );
    const element = screen.queryByTestId('navbar-logo');
    expect(element).toBeInTheDocument();
    const sp1 = screen.queryByTestId('navbar-exit');
    expect(sp1).not.toBeInTheDocument();
  });

  test('NavBar Should have inner button if not root', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/game' }]}>
        <NavBar />
      </MemoryRouter>
    );
    const sp = screen.getByTestId('navbar-exit');
    expect(sp).toBeVisible();
  });
});

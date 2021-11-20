import * as hooks from './data/routerUtil';

import { render, screen } from '@testing-library/react';

import App from './App';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';

describe('GameDetails testing', () => {
  test('Basic check', async () => {
    render(<App />);
    const element = screen.queryByTestId('navbar-logo');
    expect(element).toBeInTheDocument();
  });
});

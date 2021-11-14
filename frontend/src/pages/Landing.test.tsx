import { render, screen } from '@testing-library/react';

import Landing from './Landing';
import { MockedProvider } from '@apollo/client/testing';

describe('LaunchGame testing', () => {
  test('Or check', async () => {
    const mocks: any[] = [];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Landing />
      </MockedProvider>
    );
    const or = screen.queryByText('OR');
    expect(or).toBeInTheDocument();
  });
});

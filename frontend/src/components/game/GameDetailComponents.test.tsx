import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';

import { GameDetailComp } from './GameDetailComponents';
import { MockedProvider } from '@apollo/client/testing';

describe('GameDetailComp testing', () => {
  test('Sample GameDetailComp', async () => {
    const mocks: any[] = [];
    render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <GameDetailComp gameId="g1" userName="u1" />
      </MockedProvider>
    );

    //q await waitForElementToBeRemoved(() => screen.queryByText('Loading .....'));
  });
});

import { render, screen } from '@testing-library/react';

import DownloadCsvButton from './DownloadCsvButton';

describe('DownloadCsvButton testing', () => {
  test('Disable check', async () => {
    render(<DownloadCsvButton stories={[]} />);
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).toBeDisabled();
  });
  test('Enable check', async () => {
    render(
      <DownloadCsvButton
        stories={[
          {
            description: 'Sample Desc',
            id: 'ID1',
            isEstimated: false,
            storyPoints: 5,
            participantEstimations: [],
            areCardsOpen: true,
          },
        ]}
      />
    );
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).not.toBeDisabled();
    button.click();
  });
  test('Check isEstimated', async () => {
    render(
      <DownloadCsvButton
        stories={[
          {
            description: 'Sample Desc',
            id: 'ID1',
            isEstimated: true,
            storyPoints: 5,
            participantEstimations: [],
            areCardsOpen: true,
          },
        ]}
      />
    );
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button).not.toBeDisabled();
    button.click();
  });
});

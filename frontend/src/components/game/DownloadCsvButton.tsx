import { Story } from '../../data/types';
import DownloadIcon from '../../icons/DownloadIcon';

export interface IDownloadCsvButtonProps {
  stories: Story[];
}
export default function DownloadCsvButton(props: IDownloadCsvButtonProps) {
  const download = () => {
    const header = ['description', 'points'];

    let csvContent = `data:text/csv;charset=utf-8,${header.join(',')}\n`;
    csvContent += props.stories
      .map((s) => `"${s.description}",${s.isEstimated ? s.storyPoints : '"Not estimated"'},`)
      .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'download.csv');
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
  };
  return (
    <button type="button" className="btn" disabled={props.stories.length === 0} onClick={() => download()}>
      <DownloadIcon />
      Download CSV file
    </button>
  );
}

import toast from 'react-hot-toast';

export interface ICopyToClipBoardButtonProps {
  displayText: String;
  copyText: String;
}

export default function CopyToClipBoardButton(props: ICopyToClipBoardButtonProps) {
  const notify = () => toast('Copied to clipboard');
  const copy = () => {
    navigator.clipboard.writeText(props.copyText.toString());
    notify();
  };
  return (
    <button type="button" className="btn btn-ghost" onClick={() => copy()} data-testid="copytoclipboard">
      {props.displayText}
    </button>
  );
}

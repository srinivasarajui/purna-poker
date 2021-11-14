import ClipboardIcon from '../../icons/ClipboardIcon';

export interface ICopyToClipBoardButtonProps {
  text: String;
  showLabel?: boolean;
}

export default function CopyToClipBoardButton({ text, showLabel }: ICopyToClipBoardButtonProps) {
  const copy = () => {
    navigator.clipboard.writeText(text.toString());
  };
  return (
    <button type="button" className="btn-xs" onClick={() => copy()} data-testid="copytoclipboard">
      <ClipboardIcon />
      {showLabel ? 'Copy to clipboard' : ''}
    </button>
  );
}

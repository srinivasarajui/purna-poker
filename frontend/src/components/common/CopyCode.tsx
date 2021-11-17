import * as React from 'react';

import ClipboardIcon from '../../icons/ClipboardIcon';
import CopyToClipBoardButton from './CopyToClipBoardButton';
import { getLoadURL } from '../../data/urlUtil';

export interface ICopyCodesProps {
  isAdmin: boolean;
  gameId: String;
  adminCode: String;
}

export function CopyCodes(props: ICopyCodesProps) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="w-full btn rounded-btn ">
        <ClipboardIcon />
        Copy Codes
      </div>
      <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <CopyToClipBoardButton displayText="Copy Game code" copyText={props.gameId} />
        </li>
        <li>
          <CopyToClipBoardButton displayText="Copy Game URL" copyText={getLoadURL(props.gameId)} />
        </li>
        {props.isAdmin && (
          <>
            <li>
              <CopyToClipBoardButton displayText="Copy Admin code" copyText={props.adminCode} />
            </li>
            <li>
              <CopyToClipBoardButton
                displayText="Copy Admin URL"
                copyText={getLoadURL(props.gameId, props.adminCode)}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

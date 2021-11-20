import * as React from 'react';

import { LaunchGame } from '../components/landing/LaunchGame';
import { useParams } from 'react-router';

export interface ILoadProps {
  gid: string;
  adminCode: string;
}

export function Load() {
  let { gid, adminCode } = useParams<ILoadProps>();

  return (
    <div>
      <LaunchGame isPreset={true} gameID={gid} adminCode={adminCode}></LaunchGame>
    </div>
  );
}

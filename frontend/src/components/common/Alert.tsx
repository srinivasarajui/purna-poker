import { FunctionComponent } from 'react';
import AlertIcon from '../../icons/AlertIcon';

const Alert: FunctionComponent = (props) => {
  const { children } = props;
  return (
    <div className="alert alert-warning">
      <div className="flex-1">
        <AlertIcon />
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Alert;

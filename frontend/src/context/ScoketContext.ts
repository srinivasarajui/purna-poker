import { createContext } from 'react';

export interface SocketContextType {
  statusCode: String;
  setStatusCode: (statusCode: String) => void;
}
export const SocketContext = createContext<SocketContextType>({ statusCode: 'Not Connected', setStatusCode: () => {} });

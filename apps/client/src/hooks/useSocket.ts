import { useEffect, useRef } from 'react';
import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { io } from 'socket.io-client';

export interface SocketProps {
  options?: Partial<ManagerOptions & SocketOptions> | undefined;
  uri: string;
}

/**
 * Handles WebSocket connection on component mount
 * and WebSocket disconnection on component unmount.
 * It also prevents reconnecting on component re-rendering.
 */
export function useSocket({ options, uri }: SocketProps): Socket {
  const socketRef = useRef<Socket | undefined>();
  if (!socketRef.current) socketRef.current = io(uri, options);
  useEffect(
    () => () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = undefined;
      }
    },
    []
  );
  return socketRef.current;
}

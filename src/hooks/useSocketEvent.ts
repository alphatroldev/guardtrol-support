// useSocketEvent.ts
import { useEffect, useRef } from "react";
import { useSocketContext } from "./useSocket";

export const useSocketEvent = <T>(
  eventName: string,
  callback: (data: T) => void
) => {
  const { socket } = useSocketContext();
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!socket) return;

    const eventListener = (data: T) => savedCallback.current(data);

    socket.on(`${eventName}`, eventListener);

    return () => {
      socket.off(eventName, eventListener);
    };
  }, [eventName, socket]);
};

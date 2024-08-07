import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
// SocketContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { API_URL } from "../utils/constants";

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on("connect", () => {
      console.log("Socket connected");
      setIsConnected(true);
    });

    socket.on("disconnect", (reason: any) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });

    socket.on("connect_error", (error: any) => {
      console.log("Connection error:", error);
    });

    socketRef.current = socket;
  }, []);

  const emit = (eventName: string, data: any) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  return { socket: socketRef.current, isConnected, emit };
};

type SocketContextType = ReturnType<typeof useSocket>;

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.emit("join", "support");
      socket.socket?.onAny((eventName: any, ...args: any) => {
        console.log(`Received event: ${eventName}`, args);
      });
    }
  }, [socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

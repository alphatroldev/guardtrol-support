import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import { API_URL } from "../utils/constants"; // Ensure this path is correct

interface SocketContextType {
  socket: any;
}

const SocketContext = createContext<any | undefined>(undefined);

export const useSocket = (): any => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(API_URL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

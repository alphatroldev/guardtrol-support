// socketTypes.ts
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  newTicket: (ticket: any) => void;
  newTicketResponse: (response: any) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  join: (room: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

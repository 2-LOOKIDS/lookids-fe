export interface RoomMessage {
  roomId: string;
  userId: string;
  roomName: string;
  unreadCount: number;
  lastChatMessage?: string;
  lastChatMessageAt?: string;
}

export interface MessageResponse {
  id: string;
  roomId: string;
  messageType: string;
  senderId: string;
  createdAt: string;
  message: string;
  updatedAt: string;
}

export interface Message extends MessageResponse {
  avatar: string;
}

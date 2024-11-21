export interface ChattingList {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
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

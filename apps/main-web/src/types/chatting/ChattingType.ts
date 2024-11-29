export interface RoomMessage {
  roomId: string;
  roomName: string;
  unreadCount: number;
  participants: participant[];
  updatedAt: Date;
  lastChatMessageAt?: string;
}
export interface participant {
  userId: string;
  unreadCount: number;
  isOnline: boolean;
  lastEnterTime: Date;
  lastLeaveTime: Date;
}

export interface roomInfo {
  roomName: string;
  participants: string[];
}

export interface isRoomExist {
  result: boolean;
  roomId: string;
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
  image: string;
  nickname: string;
}

export interface ChattingRequest {
  roomId: string;
  messageType: string;
  message: string;
  senderId: string;
}
export interface MessageSectionProps {
  chatId: string;
  participants: string[];
}

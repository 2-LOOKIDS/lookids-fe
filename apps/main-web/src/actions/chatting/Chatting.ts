'use server';

import { RoomMessage } from '../../types/chatting/ChattingType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getChattingList(
  userId: string
): Promise<responseList<RoomMessage>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<RoomMessage>>
    >(
      `chatting-service/read/chat/rooms/${userId}?page=0`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('채팅방 목록 조회 중 오류 발생:', error);
    throw new Error(`채팅방 목록 조회 실패: ${error}`);
  }
}

export async function getChatList(
  roomId: string
): Promise<responseList<MessageResponseList>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<MessageResponseList>>
    >(`chatting-service/read/chat/${roomId}?page=0`, 'GET', '', 'no-cache');
    console.log(data);
    return data.result;
  } catch (error) {
    console.error('채팅 목록 조회 중 오류 발생:', error);
    throw new Error(`채팅 목록 조회 실패: ${error}`);
  }
}

export interface MessageResponseList {
  id: 'string';
  roomId: 'string';
  messageType: 'string';
  message: 'string';
  senderId: 'string';
  createdAt: 'string';
  updatedAt: 'string';
}

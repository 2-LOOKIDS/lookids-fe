'use server';

import {
  ChattingRequest,
  MessageResponse,
  roomInfo,
  RoomMessage,
} from '../../types/chatting/ChattingType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getChattingList(
  userId: string,
  page: number
): Promise<responseList<RoomMessage>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<RoomMessage>>
    >(
      `chatting-service/read/chat/rooms/${userId}?page=${page}`,
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
  roomId: string,
  page: number
): Promise<responseList<MessageResponse>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<MessageResponse>>
    >(
      `chatting-service/read/chat/${roomId}?page=${page}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('채팅 목록 조회 중 오류 발생:', error);
    throw new Error(`채팅 목록 조회 실패: ${error}`);
  }
}

// 채팅방 입장 API
export async function enterChatRoom(
  roomId: string,
  userId: string
): Promise<roomInfo> {
  try {
    const data = await fetchDataforMembers<CommonResponse<roomInfo>>(
      `chatting-service/chat/enter/${roomId}/${userId}`,
      'PUT',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('채팅방 입장 중 오류 발생:', error);
    throw new Error(`채팅방 입장 실패: ${error}`);
  }
}

export async function sendTextMessage(
  chattingRequest: ChattingRequest
): Promise<any> {
  try {
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `chatting-service/chat/messages`,
      'POST',
      chattingRequest,
      'no-cache'
    );
  } catch (error) {
    console.error('메시지 전송 중 오류 발생:', error);
    throw new Error(`메시지 전송 실패: ${error}`);
  }
}

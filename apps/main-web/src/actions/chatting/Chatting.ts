'use server';

import {
  ChattingRequest,
  isRoomExist,
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
    console.log('들어왔다', data);
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

export async function checkOneOnOneChatRoom(
  userId: string,
  targetId: string
): Promise<isRoomExist> {
  try {
    const data = await fetchDataforMembers<CommonResponse<isRoomExist>>(
      `chatting-service/read/chat/check-one-to-one-chatroom/${userId}/${targetId}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('1:1 채팅방 조회 중 오류 발생:', error);
    throw new Error(`1:1 채팅방 조회 실패: ${error}`);
  }
}

export async function createChatRoom(
  roomName: string,
  userId: string,
  targetId: string
): Promise<any> {
  try {
    const participants = [{ userId: userId }, { userId: targetId }];
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `chatting-service/chat/room`,
      'POST',
      { roomName, participants },
      'no-cache'
    );
  } catch (error) {
    console.error('채팅방 생성 중 오류 발생:', error);
    throw new Error(`채팅방 생성 실패: ${error}`);
  }
}

export async function leaveChattingRoom(
  roomId: string,
  userId: string
): Promise<any> {
  try {
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `chatting-service/chat/leave/${roomId}/${userId}`,
      'PUT',
      '',
      'no-cache'
    );
    console.log('나갈때', data);
  } catch (error) {
    console.error('채팅방 나가기 중 오류 발생:', error);
    throw new Error(`채팅방 나가기 실패: ${error}`);
  }
}

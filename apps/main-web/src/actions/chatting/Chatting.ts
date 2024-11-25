'use server';

import { RoomMessage } from '../../types/chatting/ChattingType';
import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getChattingList(userId: string): Promise<RoomMessage[]> {
  try {
    const data = await fetchDataforMembers<CommonResponse<RoomMessage[]>>(
      `chatting-service/read/chat/rooms/${userId}`,
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

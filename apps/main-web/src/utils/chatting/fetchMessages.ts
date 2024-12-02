import { getChatList } from '../../actions/chatting/Chatting';
import { MessageResponse } from '../../types/chatting/ChattingType';
import { PaginationResponse } from '../../types/responseType';

/**
 * 초기 메시지 데이터를 가져오는 유틸 함수
 */
export async function fetchInitialMessages(
  chatId: string
): Promise<MessageResponse[]> {
  try {
    const { content }: PaginationResponse<MessageResponse> =
      await getChatList(chatId);
    return content;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw new Error(`Failed to fetch messages: ${error}`);
  }
}

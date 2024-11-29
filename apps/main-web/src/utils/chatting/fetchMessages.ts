import { getChatList } from '../../actions/chatting/Chatting';
import { MessageResponse } from '../../types/chatting/ChattingType';
import { responseList } from '../../types/responseType';

/**
 * 초기 메시지 데이터를 가져오는 유틸 함수
 */
export async function fetchInitialMessages(
  chatId: string,
  page: number
): Promise<MessageResponse[]> {
  try {
    const { content }: responseList<MessageResponse> = await getChatList(
      chatId,
      page
    );
    return content;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw new Error(`Failed to fetch messages: ${error}`);
  }
}

import { getChatList } from '../../actions/chatting/Chatting';
import { MessageResponse } from '../../types/chatting/ChattingType';

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
export interface responseList<T> {
  totalPages?: number;
  totalElements?: number;
  content: T[];
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

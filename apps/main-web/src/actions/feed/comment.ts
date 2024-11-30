import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function uploadComment(
  feedCode: string,
  content: string
): Promise<any> {
  try {
    console.log('업로드할 댓글 데이터:', content);
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `feed-service/write/comment`,
      'POST',
      { feedCode, content },
      'no-cache'
    );
    console.log('댓글 업로드 응답:', data);
    return data;
  } catch (error) {
    console.error('댓글 업로드 중 오류 발생:', error);
    throw new Error(`댓글 업로드 실패: ${error}`);
  }
}

export interface Comment {
  commentCode: string;
  userUuid: string;
  nicnkname: string;
  tag?: string;
  image: string;
  content: string;
  replyCount: number;
  createdAt: string;
}

export async function getComments(
  feedCode: string,
  page: number
): Promise<responseList<Comment>> {
  try {
    console.log('댓글 데이터 요청:', feedCode);
    const data = await fetchDataforMembers<
      CommonResponse<responseList<Comment>>
    >(
      `comment-read-service/read/comment?feedCode=${feedCode}?page=${page}&size=20`,
      'GET',
      {},
      'no-cache',
      'updatecomments'
    );
    console.log('댓글 데이터 응답:', data);
    return data.result;
  } catch (error) {
    console.error('댓글 데이터 요청 중 오류 발생:', error);
    throw new Error(`댓글 데이터 요청 실패: ${error}`);
  }
}

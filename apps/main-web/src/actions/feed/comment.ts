import { CommentReplyType, CommentType } from '../../types/feed/CommentType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function uploadComment(
  feedCode: string,
  content: string
): Promise<any> {
  try {
    console.log('업로드할 댓글 데이터:', content);
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `comment-service/write/comment`,
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

export async function getComments(
  feedCode: string,
  page: number
): Promise<responseList<CommentType>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<CommentType>>
    >(
      `comment-read-service/read/comment?feedCode=${feedCode}&page=${page}&size=20`,
      'GET',
      '',
      'no-cache',
      'updatecomments'
    );
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.error('댓글 데이터 요청 중 오류 발생:', error);
    throw new Error(`댓글 데이터 요청 실패: ${error}`);
  }
}

export async function getCommentReply(
  commentCode: string
): Promise<CommentReplyType[]> {
  try {
    const data = await fetchDataforMembers<CommonResponse<CommentReplyType[]>>(
      `comment-read-service/read/comment/reply?commendCode=${commentCode}& page = 0 & size = 20`,
      'GET',
      {},
      'no-cache'
    );
    console.log('대댓글 조회 결과 : ', data.result);
    return data.result;
  } catch (error) {
    console.error('대댓글 데이터 요청 중 오류 발생:', error);
    throw new Error(`대댓글 데이터 요청 실패: ${error}`);
  }
}

export async function uploadReply(
  feedCode: string,
  parentCommentCode: string,
  content: string
): Promise<any> {
  try {
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `comment-service/write/comment/reply`,
      'POST',
      { feedCode, parentCommentCode, content },
      'no-cache'
    );
  } catch (error) {
    console.error('대댓글 업로드 중 오류 발생:', error);
    throw new Error(`대댓글 업로드 실패: ${error}`);
  }
}

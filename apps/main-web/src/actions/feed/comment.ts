import { CommentReplyType, CommentType } from '../../types/feed/CommentType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforCommon, fetchDataforMembers } from '../common/common';

/*
Commnet Service 
*/
// 댓글 달기
export async function uploadComment(
  feedCode: string,
  content: string
): Promise<any> {
  try {
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `comment-service/write/comment`,
      'POST',
      { feedCode, content },
      'no-cache'
    );
    return data;
  } catch (error) {
    console.error('댓글 업로드 중 오류 발생:', error);
    throw new Error(`댓글 업로드 실패: ${error}`);
  }
}

// 답글 달기
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
    // revalidateTag('updatecomments');
  } catch (error) {
    console.error('대댓글 업로드 중 오류 발생:', error);
    throw new Error(`대댓글 업로드 실패: ${error}`);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*

Comment Read Service

*/

// 댓글 조회
export async function getComments(
  feedCode: string,
  page: number
): Promise<responseList<CommentType>> {
  try {
    const data = await fetchDataforCommon<
      CommonResponse<responseList<CommentType>>
    >(
      `comment-read-service/read/comment?feedCode=${feedCode}&page=${page}&size=20`,
      'GET',
      '',
      'default',
      'updatecomments'
    );
    return data.result;
  } catch (error) {
    console.error('댓글 데이터 요청 중 오류 발생:', error);
    throw new Error(`댓글 데이터 요청 실패: ${error}`);
  }
}

// 답글 조회
export async function getCommentReply(
  commentCode: string
): Promise<CommentReplyType[]> {
  try {
    const data = await fetchDataforCommon<CommonResponse<CommentReplyType[]>>(
      `comment-read-service/read/comment/reply?commentCode=${commentCode}`,
      'GET',
      '',
      'no-cache',
      'updatecomments'
    );
    return data.result;
  } catch (error) {
    console.error('대댓글 데이터 요청 중 오류 발생:', error);
    throw new Error(`대댓글 데이터 요청 실패: ${error}`);
  }
}

interface commentCount {
  commentCount: number;
}

//  댓글 개수 조회
export async function getCommentCount(feedCode: string): Promise<commentCount> {
  try {
    const data = await fetchDataforMembers<CommonResponse<commentCount>>(
      `comment-read-service/read/comment/count?feedCode=${feedCode}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('댓글 수 조회 중 오류 발생:', error);
    return { commentCount: 0 };
  }
}

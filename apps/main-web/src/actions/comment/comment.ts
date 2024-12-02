import { CommentType } from '../../types/feed/CommentType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getComment(
  feedCode: string,
  page: number
): Promise<responseList<CommentType>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<CommentType>>
    >(
      `comment-read-service/read/comment?feedCode=${feedCode}&page=${page}&size=10`,
      'GET',
      null,
      'default',
      'updateComment'
    );
    console.log('댓글 조회 데이터', data.result);
    return data.result;
  } catch (error) {
    console.error(error);
    throw new Error(`댓글 조회 실패: ${error}`);
  }
}

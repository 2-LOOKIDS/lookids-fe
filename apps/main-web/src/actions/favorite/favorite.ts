import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getIsFavorite(targetCode: string): Promise<boolean> {
  try {
    const data = await fetchDataforMembers<CommonResponse<boolean>>(
      `/favorite-service/read/favorite/feed?targetCode=${targetCode}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('좋아요 조회 중 오류 발생:', error);
    throw new Error(`좋아요 조회 중 실패: ${error}`);
  }
}

export async function putFavoriteComment(
  authorUuid: string,
  targetCode: string,
  favoriteType: string
): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `/favorite-service/write/favorite`,
      'PUT',
      {
        authorUuid,
        targetCode,
        favoriteType,
      },
      'no-cache'
    );
    console.log(' 좋아요 등록 결과', data);
  } catch (error) {
    console.error('좋아요 등록 중 오류 발생:', error);
    throw new Error(`좋아요 등록 중 실패: ${error}`);
  }
}

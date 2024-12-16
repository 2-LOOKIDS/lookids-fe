'use server';

import { PinType } from '../../types/feed/FeedType';
import { Bounds, Pin } from '../../types/map/MapType';
import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getMyPinList(bounds: Bounds): Promise<Pin[]> {
  const data = await fetchDataforMembers<CommonResponse<Pin[]>>(
    // `map-service/read/map`,
    // 좌상단~우하단 내부의 핀 조회
    `map-service/read/map?ha=${bounds.ha}&&oa=${bounds.oa}&&pa=${bounds.pa}&&qa=${bounds.qa}`,
    'GET',
    null,
    'no-cache'
  );
  return data.result;
}

export async function uploadPin(pin: PinType): Promise<any> {
  try {
    const data = await fetchDataforMembers<CommonResponse<any>>(
      `map-service/write/map`,
      'POST',
      pin,
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('핀 업로드 중 오류 발생:', error);
    throw new Error(`핀 업로드 실패: ${error}`);
  }
}

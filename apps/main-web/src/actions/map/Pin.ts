'use server';

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

import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function postFcmToken(fcmToken: string): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `notification-service/write/notification/createFcmToken`,
      'POST',
      { fcmToken },
      'force-cache'
    );
  } catch (error) {
    console.error(error);
    throw Error('Failed to post FCM token');
  }
}

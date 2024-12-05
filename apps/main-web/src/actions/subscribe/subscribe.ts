import { CommonResponse } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function postSubscribe(authorUuid: string): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `subscribe-service/write/subscribe`,
      'POST',
      { authorUuid },
      'no-cache'
    );
  } catch (error) {
    console.error(error);
    throw Error('Failed to subscribe');
  }
}

export async function deleteSubscribe(authorUuid: string): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `subscribe-service/write/subscribe`,
      'DELETE',
      { authorUuid },
      'no-cache'
    );
  } catch (error) {
    console.error(error);
    throw Error('Failed to unsubscribe');
  }
}

interface Subscribers {
  subscriberUuids: string[];
}
export async function getSubscriberList(): Promise<Subscribers> {
  try {
    const data = await fetchDataforMembers<CommonResponse<Subscribers>>(
      `subscribe-service/read/subscriber`,
      'GET',
      {},
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get subscriber list');
  }
}

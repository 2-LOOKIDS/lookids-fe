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
    console.log('구독 취소 결과: ', data);
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
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get subscriber list');
  }
}

interface IsSubscribed {
  subscribed: boolean;
}
export async function getIsSubscribed(
  authorUuid: string
): Promise<IsSubscribed> {
  try {
    const data = await fetchDataforMembers<CommonResponse<IsSubscribed>>(
      `subscribe-service/read/subscribe/isSubscribed?authorUuid=${authorUuid}`,
      'GET',
      null,
      'no-cache',
      'subscribe-service'
    );
    console.log('현재 구독 결과: ', data.result);
    return data.result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get isSubscribed');
  }
}

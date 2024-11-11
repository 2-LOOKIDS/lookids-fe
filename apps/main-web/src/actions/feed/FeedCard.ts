import { FeedPostType, MediaType } from "../../types/feed/FeedType";
import { CommonResponse } from "../../types/responseType";
import { fetchDataforMembers } from "../common/common";

export const getFeedCardList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  return data;
};

export async function uploadMedia({
  images,
}: {
  images: MediaType;
}): Promise<any> {
  const data = await fetchDataforMembers<CommonResponse<string[]>>(
    `media-service/write/media`,
    "POST",
    images,
    "no-cache",
  );
  return data.result;
}

export async function uploadFeed({
  feed,
}: {
  feed: FeedPostType;
}): Promise<any> {
  const data = await fetchDataforMembers<CommonResponse<any>>(
    `media-service/write/media`,
    "POST",
    feed,
    "no-cache",
  );
  return data.result;
}

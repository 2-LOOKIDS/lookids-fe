"use client";

import SocialCard from "../../components/feedcard/SocialCard";
import MainSwiper from "../../components/main/MainSwiper";
import RecommendedPet from "../../components/main/RecommendPet";

export default function page() {
  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  return (
    <div>
      <main>
        <div className="flex flex-col mt-20 mb-20 ">
          <MainSwiper></MainSwiper>
          <hr />
          {/* <section className="mt-4 mx-4 h-[300px] bg-gray-200 rounded-xl " /> */}
          {/* <FeedCardList /> */}
          {/* <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard> */}

          <SocialCard />
          <SocialCard />
          <RecommendedPet />
          <SocialCard />
          <SocialCard />
        </div>
      </main>
    </div>
  );
}

"use client";
import SocialCard from "../../components/feedcard/SocialCard";

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
        <div className="flex flex-col mt-10 ">
          {/* <FeedCardList /> */}
          {/* <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard> */}
          <SocialCard />
          <SocialCard />
          <SocialCard />
          <SocialCard />
        </div>
      </main>
    </div>
  );
}

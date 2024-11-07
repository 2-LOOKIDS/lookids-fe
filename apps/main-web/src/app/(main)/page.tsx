"use client";

import SocialCard from "../../components/common/feedcard/SocialCard";
import MainSwiper from "../../components/icons/topNavBar/MainSwiper";
import RecommendedPet from "../../components/pages/main/RecommendPet";

export default function page() {
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

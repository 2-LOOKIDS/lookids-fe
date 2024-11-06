"use client";

import SocialCard from "../../components/feedcard/SocialCard";
import MainSwiper from "../../components/main/MainSwiper";
import RecommendedPet from "../../components/main/RecommendPet";

export default function page() {
  return (
    <div>
      <main>
        <div className="flex flex-col mt-20 mb-20 ">
          <MainSwiper></MainSwiper>
          <hr />
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

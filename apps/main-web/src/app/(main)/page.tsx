'use client';

import SocialCard from '../../components/common/feedcard/SocialCard';
import MainSwiper from '../../components/icons/topNavBar/MainSwiper';
import RecommendedPet from '../../components/pages/main/RecommendPet';

export default function page() {
  return (
    <main className="px-4">
      <div className="mb-20 mt-14 flex flex-col gap-4">
        <MainSwiper />
        {/* <section className="mt-4 mx-4 h-[300px] bg-gray-200 rounded-xl " /> */}
        {/* <FeedCardList /> */}
        {/* <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard> */}

        <SocialCard isDetail={false} />
        <SocialCard isDetail={false} />
        <RecommendedPet />
        <SocialCard isDetail={false} />
        <SocialCard isDetail={false} />
      </div>
    </main>
  );
}

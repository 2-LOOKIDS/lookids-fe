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

        <SocialCard
          isDetail={false}
          feedCode={'899a50cd-c58b-4c86-8415-d2264f0d3ebd'}
        />
        <SocialCard
          isDetail={false}
          feedCode={'a7556e00-867e-407e-a1e6-25272ee7bda7'}
        />
        <RecommendedPet />
        <SocialCard
          isDetail={false}
          feedCode={'899a50cd-c58b-4c86-8415-d2264f0d3ebd'}
        />
        <SocialCard
          isDetail={false}
          feedCode={'899a50cd-c58b-4c86-8415-d2264f0d3ebd'}
        />
      </div>
    </main>
  );
}

'use client';

import MainSwiper from '../../components/icons/topNavBar/MainSwiper';
import RecommendedPet from '../../components/pages/main/RecommendPet';
import SocialCard from '../../components/common/feedcard/SocialCard';

export default function page() {
  return (
    <div>
      <main>
        <div className="mb-20 mt-20 flex flex-col ">
          <MainSwiper></MainSwiper>
          <hr />
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
    </div>
  );
}

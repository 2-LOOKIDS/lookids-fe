import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function MainSwiperSkeleton() {
  // 임시로 3개의 슬라이드를 생성합니다.
  const skeletonSlides = [1, 2, 3, 4, 5];

  return (
    <section className="relative h-[280px] overflow-hidden">
      <Swiper
        direction="vertical"
        slidesPerView={3}
        centeredSlides
        spaceBetween={-50}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 25,
          depth: 250,
          modifier: 2.5,
          slideShadows: false,
        }}
        modules={[EffectCoverflow]}
        className="h-full"
      >
        {skeletonSlides.map((_, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <div className="bg-gray-200 p-8 rounded-2xl shadow-lg relative flex items-center animate-pulse">
              <div className="flex-1">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="w-[8.5rem] h-[8.5rem] bg-gray-300 rounded-full absolute right-5"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center mt-4 space-x-1 absolute bottom-5 w-full">
        {skeletonSlides.map((_, index) => (
          <div
            key={index}
            className={`h-[5px] rounded-full transition-all ${
              index === 0 ? 'bg-gray-400 w-[18px]' : 'bg-gray-300 w-[5px]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

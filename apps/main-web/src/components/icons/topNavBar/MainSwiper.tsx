'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { getRandomPetList } from '../../../actions/user';
import { PetDetail } from '../../../types/user';
import { getMediaUrl } from '../../../utils/media';

export default function MainSwiper() {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward'); // 슬라이드 방향 상태
  const [SlideIndex, setSlideIndex] = useState(0); // 현재 슬라이드 인덱스
  const swiperRef = useRef<SwiperType | null>(null);
  const [petData, setPetData] = useState<PetDetail[]>([]);
  useEffect(() => {
    const fetchPetData = async () => {
      const data = await getRandomPetList();
      setPetData(data);
    };

    fetchPetData();
  }, []);
  const handleSlideChange = (swiper: any) => {
    setSlideIndex(swiper.activeIndex); // 현재 슬라이드 인덱스를 업데이트
    // 끝 또는 처음에 도달하면 방향 변경
    if (direction === 'forward' && swiper.activeIndex === petData.length - 1) {
      setDirection('backward');
      swiper.autoplay.stop();
      swiper.params.autoplay.reverseDirection = true; // 역방향으로 변경
      swiper.autoplay.start();
    } else if (direction === 'backward' && swiper.activeIndex === 0) {
      setDirection('forward');
      swiper.autoplay.stop();
      swiper.params.autoplay.reverseDirection = false; // 정방향으로 변경
      swiper.autoplay.start();
    }
  };

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
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="h-full"
        onSlideChange={handleSlideChange} // 슬라이드 변경 이벤트
        onSwiper={(swiper) => (swiperRef.current = swiper)} // Swiper 인스턴스를 저장
      >
        {petData.map((pet, index) => (
          <SwiperSlide key={index} className="swiper-slide-custom">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fd9340] via-[#ff7e54] to-[#ffaf7b]"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-16 translate-y-16"></div>
              <div className="relative p-4 flex items-center justify-between">
                <div className="flex-1 z-10 pr-4">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {pet.name}
                  </h2>
                  <p className="text-yellow-100 text-base mb-2">
                    {pet.type} | {pet.age}살
                  </p>
                  <div className="flex items-center space-x-2 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-medium">@{pet.name}</span>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-28 h-28 rounded-full border-2 border-white shadow-lg overflow-hidden">
                    <Image
                      src={getMediaUrl(pet.image)}
                      alt={`${pet.name} image`}
                      width={112}
                      height={112}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-4 flex items-center space-x-3 text-white">
                <div className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs">{pet.comment}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center items-center mt-4 space-x-1 absolute bottom-5 w-full">
        {petData.map((_, index) => (
          <div
            key={index}
            className={`h-[5px] rounded-full transition-all ${
              index === SlideIndex
                ? 'bg-orange-500 w-[18px]'
                : 'bg-gray-300 w-[5px]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

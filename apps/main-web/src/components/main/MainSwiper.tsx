// MainSwiper.tsx
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCarouselCard from "./SwiperCarouselCard";

SwiperCore.use([Navigation, Scrollbar, Autoplay, EffectCoverflow]);

export default function MainSwiper() {
  // 여기서 Pet Data를 받아야 함.
  const pets = [
    {
      name: "맥시",
      type: "Dog",
      breed: "보더 콜리",
      imageUrl: "https://picsum.photos/200/150?random=3",
    },
    {
      name: "달순이",
      type: "Dog",
      breed: "골든 리트리버",
      imageUrl: "https://picsum.photos/200/150?random=1",
    },
    {
      name: "미로",
      type: "고양이",
      breed: "페르시안",
      imageUrl: "https://picsum.photos/200/150?random=2",
    },
    {
      name: "이고",
      type: "도마뱀",
      breed: "이구아나",
      imageUrl: "https://picsum.photos/200/150?random=4",
    },
  ];
  return (
    <section>
      <Swiper
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {pets.map((pet, index) => (
          <SwiperSlide key={index}>
            <SwiperCarouselCard pet={pet} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

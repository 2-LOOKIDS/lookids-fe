'use client';
import { useRouter } from 'next/navigation';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Pin } from '../../types/map/MapType';
import { getMediaUrl } from '../../utils/media';

export default function MapMarkingList({ PinList }: { PinList: Pin[] }) {
  const router = useRouter();

  const handleMarkerClick = (feedCode: string) => {
    router.push(`/feed/${feedCode}`);
  };

  return (
    <>
      {PinList.map((pin, index) => (
        <CustomOverlayMap
          key={index}
          position={{ lat: pin.latitude, lng: pin.longitude }}
          clickable // 클릭 이벤트를 활성화
        >
          <div
            onClick={() => handleMarkerClick(pin.feedCode)}
            style={{
              width: '50px', // 너비
              height: '50px', // 높이
              backgroundImage: `url(${getMediaUrl(pin.mediaUrl)})`, // 이미지 경로
              backgroundSize: 'cover', // 이미지 크기
              backgroundRepeat: 'no-repeat', // 반복 방지
              backgroundPosition: 'center', // 이미지 가운데 정렬
              borderRadius: '50%', // 원형 스타일
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 그림자 효과
              cursor: 'pointer', // 클릭 커서
            }}
          ></div>
        </CustomOverlayMap>
      ))}
    </>
  );
}

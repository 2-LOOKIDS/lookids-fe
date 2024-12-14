'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Map, useKakaoLoader } from 'react-kakao-maps-sdk';
import { useDebouncedCallback } from 'use-debounce';
import { getMyPinList } from '../../actions/map/Pin';
import { Bounds, Pin } from '../../types/map/MapType';
import MapMarkingList from './MapMarkingList';
export default function KakaoMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  useKakaoLoader({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || '' });

  // 내위치
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [myPinList, setMyPinList] = useState<Pin[]>([]);
  const [bounds, setBounds] = useState<Bounds>();
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

  // 여기서 내 currentPosition 받아서 마커 찍기
  const handleMyPinList = useDebouncedCallback((map) => {
    const bound = map.getBounds();
    setBounds({
      ha: bound.getSouthWest().getLat(),
      oa: bound.getSouthWest().getLng(),
      pa: bound.getNorthEast().getLat(),
      qa: bound.getNorthEast().getLng(),
    });
    // 비동기 API 호출 처리
    if (bounds) {
      try {
        getMyPinList(bounds)
          .then((data) => {
            setMyPinList(data);
            // 필요한 데이터 처리 로직 추가
          })
          .catch((error) => {
            console.error('Failed to fetch pin list:', error);
          });
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    } else {
      console.error('Bounds are not defined.');
    }
  }, 300);

  const handleScriptLoad = () => {
    if (window.kakao) {
      try {
        window.kakao.maps.load(() => {
          setIsMapLoaded(true);
        });
      } catch (error) {
        setMapError('Kakao Maps SDK failed to load.');
      }
    } else {
      setMapError('Kakao Maps SDK failed to load.');
    }
  };

  const handleMapError = () => {
    setMapError('Failed to load Kakao Maps. Please try again later.');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('위치 정보 가져오기 실패:', error);
          setMapError('위치 권한을 허용해주세요.');
        }
      );
    } else {
      setMapError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="relative h-[80vh] w-full">
      <Script
        src={KAKAO_SDK_URL}
        onLoad={handleScriptLoad}
        onError={handleMapError}
      />

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 p-4 text-red-700">
          {mapError}
        </div>
      )}

      {!isMapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          Loading map...
        </div>
      )}

      {isMapLoaded && (
        <Map
          id="map"
          center={currentPosition || { lat: 37.5665, lng: 126.978 }} // 초기 위치는 서울로 설정
          style={{ width: '100%', height: '100%' }}
          level={3} // 맵 확대 수준 설정
          onBoundsChanged={handleMyPinList}
        >
          <MapMarkingList PinList={myPinList}></MapMarkingList>
        </Map>
      )}
    </div>
  );
}

"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import MapMarkingList from "./MapMarkingList";

export default function KakaoMap() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

  const handleScriptLoad = () => {
    console.log("Kakao SDK 로드 완료");
    if (window.kakao) {
      window.kakao.maps.load(() => {
        console.log("Kakao Maps 로드 완료");
        setIsMapLoaded(true);
      });
    } else {
      setMapError("Kakao Maps SDK failed to load.");
    }
  };

  const handleMapError = () => {
    console.log("Kakao SDK 로드 실패");
    setMapError("Failed to load Kakao Maps. Please try again later.");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log("위치 권한 요청 중...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("위치 정보 가져오기 성공:", position.coords);
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
          setMapError("위치 권한을 허용해주세요.");
        },
      );
    } else {
      console.log("Geolocation이 지원되지 않는 브라우저입니다.");
      setMapError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="w-full h-[80vh] relative">
      <Script
        src={KAKAO_SDK_URL}
        onLoad={handleScriptLoad}
        onError={handleMapError}
      />

      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-700 p-4">
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
          center={currentPosition || { lat: 37.5665, lng: 126.978 }} // 초기 위치는 서울로 설정
          style={{ width: "100%", height: "100%" }}
          level={3} // 맵 확대 수준 설정
        >
          <MapMarkingList />

          {currentPosition && (
            <MapMarker position={currentPosition}>
              <div style={{ color: "#000" }}>현재 위치</div>
            </MapMarker>
          )}

          <MapMarker position={{ lat: 37.5665, lng: 126.978 }}>
            <div style={{ color: "#000" }}>Hello World</div>
          </MapMarker>
        </Map>
      )}
    </div>
  );
}

import { Bounds, Pin } from '../types/map/MapType';

export function clusterPins(pins: Pin[], bounds: Bounds, radius: number) {
  const clustered: {
    lat: number;
    lng: number;
    count: number;
    pins: Pin[];
    firstMediaUrl: string | null;
  }[] = [];

  pins.forEach((pin) => {
    const existingCluster = clustered.find((cluster) => {
      const distance = getDistance(
        { lat: cluster.lat, lng: cluster.lng },
        { lat: pin.latitude, lng: pin.longitude }
      );
      return distance < radius; // 클러스터 반경 안에 있는지 확인
    });

    if (existingCluster) {
      existingCluster.count += 1;
      existingCluster.pins.push(pin);
    } else {
      clustered.push({
        lat: pin.latitude,
        lng: pin.longitude,
        count: 1,
        pins: [pin],
        firstMediaUrl: pin.mediaUrl, // 첫 번째 마커의 mediaUrl을 저장
      });
    }
  });
  console.log('Clustered:', clustered);
  return clustered;
}

function getDistance(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371e3; // 지구 반경 (미터 단위)
  const φ1 = (a.lat * Math.PI) / 180; // 위도1 (라디안 변환)
  const φ2 = (b.lat * Math.PI) / 180; // 위도2 (라디안 변환)
  const Δφ = ((b.lat - a.lat) * Math.PI) / 180; // 위도 차
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180; // 경도 차

  const aDist =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(aDist), Math.sqrt(1 - aDist));

  return R * c; // 두 점 사이의 거리 반환 (미터)
}

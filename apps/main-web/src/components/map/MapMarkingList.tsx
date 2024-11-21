import { useState } from 'react';
import {
  CustomOverlayMap,
  MapMarker,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { Pin } from '../../types/map/MapType';

export default function MapMarkingList({ PinList }: { PinList: Pin[] }) {
  console.log('PinList:', PinList);
  const [openMarkers, setOpenMarkers] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleMarkerClick = (index: number) => {
    setOpenMarkers((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 클릭한 마커의 상태만 토글
    }));
  };

  return (
    <MarkerClusterer averageCenter={true} minLevel={10}>
      {PinList.map((pin, index) => (
        <MapMarker
          key={index}
          position={{ lat: pin.latitude, lng: pin.longitude }}
          onClick={() => handleMarkerClick(index)}
        >
          {openMarkers[index] && (
            <CustomOverlayMap
              position={{
                lat: pin.latitude,
                lng: pin.longitude,
              }}
            >
              <div>안녕 클레오 파트라</div>
            </CustomOverlayMap>
          )}
        </MapMarker>
      ))}
    </MarkerClusterer>
  );
}

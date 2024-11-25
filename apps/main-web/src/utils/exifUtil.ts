// utils/exifUtils.ts
import EXIF from 'exif-js';

export const extractGpsData = (
  file: File
): Promise<{ latitude: number; longitude: number; hasGpsData: boolean }> => {
  return new Promise((resolve, reject) => {
    let calcullong = 0,
      calculat = 0;
    let hasGpsData = false;

    const reader = new FileReader();
    reader.onload = function (event) {
      const dataURL = event.target?.result as string;

      const img = document.createElement('img') as HTMLImageElement;
      img.src = dataURL;

      img.onload = function () {
        EXIF.getData(img as any, function (this: HTMLImageElement) {
          const longitudeData = EXIF.getTag(this, 'GPSLongitude');
          const latitudeData = EXIF.getTag(this, 'GPSLatitude');

          if (longitudeData && latitudeData) {
            hasGpsData = true;
            calcullong =
              longitudeData[0] +
              longitudeData[1] / 60 +
              longitudeData[2] / 3600;
            calculat =
              latitudeData[0] + latitudeData[1] / 60 + latitudeData[2] / 3600;
          }
          resolve({ latitude: calculat, longitude: calcullong, hasGpsData });
        });
      };
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

"use client";
import { Button } from "@repo/ui/components/ui/button";
import EXIF from "exif-js";
import { Plus, X } from "lucide-react";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { useRef } from "react";
import { useImage } from "../../../context/ImageContext";

export default function ImageUpload() {
  const { images, setImages } = useImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  let { uploadToS3 } = useS3Upload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);

      for (const file of newImages) {
        try {
          let calcullong = 0,
            calculat = 0;
          let hasGpsData = false;
          console.log(file);
          const reader = new FileReader();
          reader.onload = function (event) {
            const dataURL = event.target?.result as string;

            // Blob URL을 img 요소에 로드하여 EXIF 데이터 추출
            const img = document.createElement("img") as HTMLImageElement;
            img.src = dataURL;

            img.onload = function () {
              EXIF.getData(img as any, function (this: HTMLImageElement) {
                let altitudeData = EXIF.getTag(this, "GPSAltitude");
                let longitudeData = EXIF.getTag(this, "GPSLongitude");
                let latitudeData = EXIF.getTag(this, "GPSLatitude");

                if (longitudeData && latitudeData) {
                  hasGpsData = true;
                  calcullong =
                    longitudeData[0] +
                    longitudeData[1] / 60 +
                    longitudeData[2] / 3600;
                  calculat =
                    latitudeData[0] +
                    latitudeData[1] / 60 +
                    latitudeData[2] / 3600;
                }
              });
            };
          };
          reader.readAsDataURL(file); // Data URL 형식으로 파일 읽기

          let url = await uploadToS3(file);
          const cdnurl = `https://media.lookids.online/${url.key}`;
          setImages((prev) => [
            ...prev,
            hasGpsData
              ? {
                  mediaUrl: cdnurl,
                  mediaType: "image",
                  gpsInfo: {
                    latitude: calculat,
                    longitude: calcullong,
                  },
                }
              : { mediaUrl: cdnurl, mediaType: "image" },
          ]);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={image.mediaUrl}
              alt={`Upload ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-white rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            {image.gpsInfo && (
              <p>
                {" "}
                {image.gpsInfo.latitude} {image.gpsInfo.longitude}
              </p>
            )}
          </div>
        ))}
        {images.length < 5 && (
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
              multiple
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="rounded-full"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

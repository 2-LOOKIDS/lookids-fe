"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { useRef, useState } from "react";
import AddFeedHeader from "./AddFeedHeader";
import FeedTags from "./FeedTags";

export default function MultiImageUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  let [imageUrl, setImageUrl] = useState<
    { url: string; bucket: string; key: string } | undefined
  >(undefined);
  const tags = ["디자인", "배고프다", "집가고 싶다"];

  let { uploadToS3 } = useS3Upload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      for (const file of newImages) {
        try {
          let url = await uploadToS3(file);
          setImageUrl(url);
          console.log(url);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-white">
      {/* Header */}
      <AddFeedHeader />

      {/* Image Upload Area */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
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

      {/* Form */}
      <div className="p-4 space-y-6">
        <Input
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-gray-300"
        />

        <Textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] border-gray-300"
        />
        {/* Tags */}
        <FeedTags tags={tags} />

        {/* Draft Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="draft"
            checked={isDraft}
            onCheckedChange={(checked) => setIsDraft(checked as boolean)}
          />
          <label
            htmlFor="draft"
            className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            모두 선택하기
          </label>
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-4">
          <Button className="w-full bg-[#FD9340] hover:bg-[#FD9340]/90 text-xl font-semibold py-6">
            저장하기
          </Button>
          <Button
            variant="ghost"
            className="w-full text-[#FD9340] hover:text-[#FD9340]/90"
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
}

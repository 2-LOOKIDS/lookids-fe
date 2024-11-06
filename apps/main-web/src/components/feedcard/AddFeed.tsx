"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { ChevronLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { uploadToS3 } from "../../actions/feed/FeedCard";

// Assuming you have an S3 upload function

export default function MultiImageUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = ["디자인", "배고프다", "집가고 싶다"];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      for (const file of newImages) {
        try {
          const url = await uploadToS3(file);
          setImages((prev) => [...prev, url]);
        } catch (error) {
          console.error("Failed to upload image:", error);
        }
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-[52px] border-b mt-16">
        <Link href="/" className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-center font-semibold">FEED</h1>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>

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
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-gray-300"
        />

        <Textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] border-gray-300"
        />

        {/* Tags */}
        <div className="space-y-2">
          <h3 className="text-sm">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border
                  ${
                    selectedTags.includes(tag)
                      ? "border-[#FD9340] bg-[#FD9340]/10 text-[#FD9340]"
                      : "border-gray-300 text-gray-600"
                  }`}
              >
                {selectedTags.includes(tag) && (
                  <div className="w-4 h-4 bg-[#FD9340] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-3 h-3 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
                {tag}
              </button>
            ))}
          </div>
        </div>

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

import { useState } from "react";

export default function FeedTags(tags: { tags: string[] }) {
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  return (
    <div className="space-y-2">
      <h3 className="text-sm">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.tags.map((tag) => (
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
  );
}

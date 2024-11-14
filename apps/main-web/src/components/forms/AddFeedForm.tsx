import { Button } from '@repo/ui/components/ui/button';
import { Textarea } from '@repo/ui/components/ui/textarea';
import React, { useEffect, useState } from 'react';
import { uploadFeedWithMedia } from '../../actions/feed/FeedCard';
import { useImage } from '../../context/ImageContext';
import { FeedPostType } from '../../types/feed/FeedType';
import FeedTags from '../common/feedcard/FeedTags';

export default function AddFeedForm() {
  const [content, setContent] = useState<string>('');
  const tags = ['#디자인', '#배고프다', '#집가고싶다'];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { images } = useImage();

  const handleTagSelect = (tag: string) => {
    const hashTag = `${tag}`;
    if (!selectedTags.includes(hashTag)) {
      // 태그가 선택되지 않은 상태에서 추가
      setSelectedTags((prev) => [...prev, hashTag]);
      setContent((prev) => `${prev} ${hashTag}`);
    } else {
      // 태그가 이미 선택된 상태에서 제거
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
      setContent((prev) => prev.replace(hashTag, '').trim());
    }
  };

  useEffect(() => {
    // Textarea 내용에 있는 태그들을 selectedTags에 업데이트
    const contentTags = tags.filter((tag) => content.includes(tag));
    setSelectedTags(contentTags);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // #태그명을 찾아서 selectedTags에 중복 없이 추가
    const extractedTags = content.match(/#\S+/g) || []; // #으로 시작하는 단어들 찾기
    const uniqueTags = [...new Set([...selectedTags, ...extractedTags])]; // 중복 제거하여 배열 합치기

    setSelectedTags(uniqueTags); // 최종 uniqueTags 배열을 설정

    // 저장 작업 수행
    console.log('Form submitted with content:', content);
    console.log('Selected tags:', uniqueTags);
    console.log('images', images);
    const feedData: FeedPostType = {
      content,
      tags: uniqueTags,
    };

    // 여기서 serveraction 수행
    const data = await uploadFeedWithMedia({ feed: feedData, images: images });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <Textarea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        className="min-h-[150px] border-gray-300"
      />
      {/* Tags */}
      <FeedTags
        tags={tags}
        selectedTags={selectedTags}
        onTagToggle={handleTagSelect}
      />

      {/* Buttons */}
      <div className="space-y-4 pt-4">
        <Button
          type="submit"
          className="bg-lookids hover:bg-lookids/90 w-full py-6 text-xl font-semibold"
        >
          저장하기
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-lookids hover:text-lookids/90  w-full"
          onClick={() => setContent('')} // 취소 시 내용 초기화
        >
          취소하기
        </Button>
      </div>
    </form>
  );
}

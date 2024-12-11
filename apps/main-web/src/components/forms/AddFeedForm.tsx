'use client';
import { Button } from '@repo/ui/components/ui/button';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { uploadFeedWithMedia } from '../../actions/feed/FeedCard';
import { useImage } from '../../context/ImageContext';
import { FeedPostType } from '../../types/feed/FeedType';
import FeedTags from '../common/feedcard/addFeed/FeedTags';

interface AddFeedFormProps {
  selectedPetCode: string[] | null;
}
export default function AddFeedForm({ selectedPetCode }: AddFeedFormProps) {
  const [content, setContent] = useState<string>('');
  const tags = ['#디자인', '#배고프다', '#집가고싶다'];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { images } = useImage();
  const router = useRouter();
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

    if (!images || images.length === 0) {
      Swal.fire({
        title: '이미지를 1개 이상 업로드 해주세요!',
        confirmButtonText: '확인',
      });
      return;
    }

    const extractedTags = content.match(/#\S+/g) || []; // #으로 시작하는 단어들 찾기
    const uniqueTags = [...new Set([...selectedTags, ...extractedTags])]; // 중복 제거하여 배열 합치기
    console.log(uniqueTags);

    const feedData: FeedPostType = {
      content,
      tagList: uniqueTags,
    };
    // selectedPetCode가 있을경우에 , 로 string으로 만들어서 넘김
    if (selectedPetCode) {
      feedData.petCode = selectedPetCode;
    }
    const res = await uploadFeedWithMedia({
      feed: feedData,
      images: images,
    });
    console.log(res);
    if (res.isSuccess) {
      alert('게시물이 성공적으로 등록되었습니다.');
      router.push('/');
    } else {
      console.log(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      <Textarea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        className="min-h-[140px] border-gray-300 text-[16px]"
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

'use client';

import { throttle } from 'lodash';
import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { getComments } from '../../../actions/feed/comment';
import Comments from './Comments';

export default function CommentSection({
  commentCode,
}: {
  commentCode: string;
}) {
  // SWR의 useSWRInfinite를 사용해 무한 스크롤 데이터 페칭
  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    (pageIndex) => `/api/comments/${commentCode}?page=${pageIndex}`,
    (url) => getComments(commentCode, parseInt(url.split('page=')[1])),
    { revalidateOnFocus: false } // 포커스 시 리페치 비활성화
  );

  // 가져온 데이터를 병합
  const comments = data ? data.flatMap((page) => page.content) : [];

  // 스크롤 이벤트로 페이지 증가 처리
  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading &&
      !isValidating
    ) {
      setSize(size + 1); // 페이지 증가
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {comments.map((comment) => (
        <Comments key={comment.commentCode} comment={comment} />
      ))}
      {/* 로딩 상태 표시 */}
      {(isLoading || isValidating) && <div>Loading...</div>}
    </div>
  );
}

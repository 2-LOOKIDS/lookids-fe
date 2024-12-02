'use client';

import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { getComment } from '../../../actions/comment/comment';
import { CommentType } from '../../../types/feed/CommentType';
import { responseList } from '../../../types/responseType';
import Comments from './Comments';

export default function CommentSection({
  commentCode,
}: {
  commentCode: string;
}) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const getCommentData = async () => {
      try {
        const data: responseList<CommentType> = await getComment(
          commentCode,
          page
        );
        setComments((prevComments) => {
          const newComments = data.content.filter(
            (newComment) =>
              !prevComments.some(
                (comment) => comment.commentCode === newComment.commentCode
              )
          );
          return [...prevComments, ...newComments];
        });
      } catch (error) {
        console.error(error);
      }
    };

    getCommentData();
  }, [commentCode, page]);

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      comments.length > 0
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [comments]);

  return (
    <div>
      {comments.map((comment) => (
        <Comments key={comment.commentCode} comment={comment} />
      ))}
    </div>
  );
}

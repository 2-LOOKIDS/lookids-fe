'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getCommentCount } from '../../../../actions/feed/comment';
import { deleteFeed, getIsMyFeed } from '../../../../actions/feed/FeedCard';
import AddFeedCommentSection from '../../../../components/common/comments/AddFeedCommentSection';
import CommentSection from '../../../../components/common/comments/CommentSection';
import SocialCard from '../../../../components/common/feedcard/socialCard/SocialCard';
import CommonHeader from '../../../../components/ui/CommonHeader';
import { MenuItem } from '../../../../types/common/MenuType';

export default function FeedPage({ params }: { params: { feedCode: string } }) {
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isMyFeed, setIsMyFeed] = useState<boolean>(false);

  useEffect(() => {
    const fetchisMyFeed = async () => {
      const myFeed = await getIsMyFeed(params.feedCode);
      setIsMyFeed(myFeed);
    };
    const fetchCommentCount = async () => {
      const commentCount = await getCommentCount(params.feedCode);
      if (commentCount.commentCount) {
        setCommentCount(commentCount.commentCount);
      } else {
        setCommentCount(0);
      }
    };
    fetchisMyFeed();
    fetchCommentCount();
  }, [params.feedCode]);

  const handleDeleteFeed = async () => {
    const result = await Swal.fire({
      title: '피드 삭제',
      text: '정말로 이 피드를 삭제하시겠습니까?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: '삭제하기',
      cancelButtonText: '취소',
    });

    if (result.isConfirmed) {
      const isDeleted = await deleteFeed(params.feedCode); // 서버 액션 호출
      Swal.fire('삭제 완료', '피드가 삭제되었습니다.', 'success').then(() => {
        window.location.href = '/feed'; // 삭제 후 피드 목록으로 리다이렉트
      });
    }
  };

  const feedMenuItems: MenuItem[] = [
    {
      label: '피드 신고하기',
      onClick: () =>
        Swal.fire({
          title: '신고하기',
          text: '피드를 신고하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '신고하기',
          cancelButtonText: '취소',
        }),
    },
    ...(isMyFeed
      ? [
          {
            label: '피드 삭제하기',
            onClick: handleDeleteFeed, // 삭제 함수 연결
            className: 'text-red-600 font-semibold',
          },
        ]
      : []),
    {
      label: '작성자 차단',
      onClick: () =>
        Swal.fire({
          title: '작성자 차단',
          text: '정말로 작성자를 차단하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '차단하기',
          cancelButtonText: '취소',
        }).then((result) => {
          if (result.isConfirmed) {
            alert('작성자가 차단되었습니다.');
          }
        }),
    },
    {
      label: '링크 복사하기',
      onClick: () =>
        Swal.fire({
          title: '링크 복사',
          text: '링크가 복사되었습니다.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        }),
    },
  ];

  return (
    <>
      <CommonHeader
        title={'피드상세'}
        ismenu={true}
        menuItems={feedMenuItems}
      ></CommonHeader>
      <div>
        <SocialCard isDetail={true} feedCode={params.feedCode}></SocialCard>
        <section className="px-4 ">
          <h3 className="py-4 text-xl text-lookids">{`댓글 (${commentCount})`}</h3>
          <AddFeedCommentSection
            feedCode={params.feedCode}
          ></AddFeedCommentSection>
          <CommentSection feedCode={params.feedCode}></CommentSection>
        </section>
      </div>
    </>
  );
}

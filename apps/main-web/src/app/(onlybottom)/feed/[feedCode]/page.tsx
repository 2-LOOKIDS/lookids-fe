'use client';
import Swal from 'sweetalert2';
import { getCommentCount } from '../../../../actions/feed/comment';
import AddFeedCommentSection from '../../../../components/common/comments/AddFeedCommentSection';
import CommentSection from '../../../../components/common/comments/CommentSection';
import SocialCard from '../../../../components/common/feedcard/SocialCard';
import CommonHeader from '../../../../components/ui/CommonHeader';
import { MenuItem } from '../../../../types/common/MenuType';

export default async function page({
  params,
}: {
  params: { feedCode: string };
}) {
  let commentCount = await getCommentCount(params.feedCode);
  if (!commentCount) {
    commentCount = { commentCount: 0 };
  }

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
    { label: '피드 삭제하기', onClick: () => alert('피드를 삭제했습니다.') },
    { label: '작성자 차단', onClick: () => alert('작성자를 차단했습니다.') },
    { label: '피드 저장하기', onClick: () => alert('피드를 저장했습니다.') },
    { label: '링크 복사하기', onClick: () => alert('링크를 복사했습니다.') },
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
        <section className="px-4 pb-8">
          <h3 className="py-4 text-xl text-lookids">{`댓글 (${commentCount.commentCount ? commentCount.commentCount : '0'})`}</h3>
          <AddFeedCommentSection
            feedCode={params.feedCode}
          ></AddFeedCommentSection>
          <CommentSection feedCode={params.feedCode}></CommentSection>
        </section>
      </div>
    </>
  );
}

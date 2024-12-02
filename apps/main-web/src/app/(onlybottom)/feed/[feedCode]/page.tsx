'use server';
import AddFeedCommentSection from '../../../../components/common/comments/AddFeedCommentSection';
import CommentSection from '../../../../components/common/comments/CommentSection';
import SocialCard from '../../../../components/common/feedcard/SocialCard';

export default async function page({
  params,
}: {
  params: { feedCode: string };
}) {
  return (
    <>
      <div>
        <SocialCard isDetail={true} feedCode={params.feedCode}></SocialCard>
        <section className="px-4 pb-8">
          <h3 className="py-4 text-xl text-lookids">댓글 ( 123 )</h3>
          <AddFeedCommentSection
            feedCode={params.feedCode}
          ></AddFeedCommentSection>
          <CommentSection feedCode={params.feedCode}></CommentSection>
        </section>
      </div>
    </>
  );
}

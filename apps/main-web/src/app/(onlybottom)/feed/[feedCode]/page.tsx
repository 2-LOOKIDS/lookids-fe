import Comments from '../../../../components/common/comments/Comments';
import AddFeedCommentSection from '../../../../components/common/comments/FeedCommentSection';
import SocialCard from '../../../../components/common/feedcard/SocialCard';

export default async function page({
  params,
}: {
  params: { feedCode: string };
}) {
  return (
    <>
      <div>
        <SocialCard isDetail={true}></SocialCard>
        <section className="px-4 pb-8">
          <AddFeedCommentSection></AddFeedCommentSection>
          <Comments></Comments>
        </section>
      </div>
    </>
  );
}

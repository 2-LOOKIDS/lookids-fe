import Comments from '../../../../components/common/comments/Comments';
import AddFeedCommentSection from '../../../../components/common/comments/FeedCommentSection';
import SocialCard from '../../../../components/common/feedcard/SocialCard';

export default async function page({
  params,
}: {
  params: { feedCode: string };
}) {
  // 여기서 Feed에 대한 Comments Data를 받아와서 map으로 comments에 넣음
  return (
    <>
      <div>
        <SocialCard isDetail={true}></SocialCard>
        <section className="px-4 pb-8">
          <h3 className="py-4 text-xl">댓글 ( 123 )</h3>
          <AddFeedCommentSection></AddFeedCommentSection>
          <Comments commentCode={'12344'}></Comments>
          <Comments commentCode={'12344'}></Comments>
          <Comments commentCode={'12344'}></Comments>
        </section>
      </div>
    </>
  );
}

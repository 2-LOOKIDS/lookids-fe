import AddFeedCommentSection from "../../../../components/common/feedcard/FeedCommentSection";
import SocialCard from "../../../../components/common/feedcard/SocialCard";

export default async function page({
  params,
}: {
  params: { feedCode: string };
}) {
  return (
    <>
      <div>
        <SocialCard isDetail={true}></SocialCard>
        <section className="px-6 pb-8">
          <AddFeedCommentSection></AddFeedCommentSection>
        </section>
      </div>
    </>
  );
}

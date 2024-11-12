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
        <hr />
        <AddFeedCommentSection feedCode={"5"}></AddFeedCommentSection>
      </div>
    </>
  );
}

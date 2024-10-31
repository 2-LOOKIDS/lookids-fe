import SocialCard from "../../components/feedcard/SocialCard";

export default function page() {
  return (
    <div>
      <main>
        <div className="flex flex-col mt-10 ">
          {/* <FeedCardList /> */}
          {/* <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard> */}
          <SocialCard />
          <SocialCard />
          <SocialCard />
          <SocialCard />
        </div>
      </main>
    </div>
  );
}

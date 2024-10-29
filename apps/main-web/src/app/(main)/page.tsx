import FeedCard from "../../components/feedcard/FeedCard";
import SocialCard from "../../components/feedcard/SocialCard";
import BottomAppBar from "../../components/ui/BottomAppBar";
import TopNavBar from "../../components/ui/TopNavBar";

export default function page() {
  return (
    <div>
      <header>
        <TopNavBar />
      </header>
      <main>
        <div className="flex flex-col mt-10 ">
          {/* <FeedCardList /> */}
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <FeedCard></FeedCard>
          <SocialCard />
          <SocialCard />
        </div>
      </main>

      <footer>
        <BottomAppBar />
      </footer>
    </div>
  );
}

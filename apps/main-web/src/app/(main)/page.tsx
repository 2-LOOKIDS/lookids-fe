import FeedCard from "@/components/feedcard/FeedCard";
import BottomAppBar from "@/components/ui/BottomAppBar";
import TopNavBar from "@/components/ui/TopNavBar";

export default function page() {
  return (
    <div>
      <header>
        <TopNavBar />
      </header>
      <main>
        <div className="flex flex-col mt-10 h-screen">
          {/* <FeedCardList /> */}
          <FeedCard></FeedCard>
        </div>
      </main>

      <footer>
        <BottomAppBar />
      </footer>
    </div>
  );
}

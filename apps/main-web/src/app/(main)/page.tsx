import FeedCard from "@/components/feedcard/FeedCard";
import TopNavBar from "@/components/main/TopNavBar";

export default function page() {
  return (
    <div>
      <header>
        <TopNavBar />
      </header>
      <main>
        <div className="flex flex-col mt-10 h-screen">
          <FeedCard></FeedCard>
        </div>
      </main>
    </div>
  );
}

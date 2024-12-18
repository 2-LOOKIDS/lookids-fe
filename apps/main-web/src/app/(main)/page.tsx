import {
  getMainFeedList,
  getRandomFeedList,
} from '../../actions/feed/FeedCard';
import FeedPage from '../../components/pages/main/feedPage';

export default async function Page() {
  const initialData =
    (await getMainFeedList(0)) || (await getRandomFeedList(0)); // 초기 데이터
  return <FeedPage initialData={initialData} />;
}

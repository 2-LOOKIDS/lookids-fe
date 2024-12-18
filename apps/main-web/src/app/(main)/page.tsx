import { getMainFeedList } from '../../actions/feed/FeedCard';
import FeedPage from '../../components/pages/main/feedPage';

export default async function Page() {
  const initialData = await getMainFeedList(0); // 서버 사이드 데이터 불러오기
  return <FeedPage initialData={initialData} />;
}

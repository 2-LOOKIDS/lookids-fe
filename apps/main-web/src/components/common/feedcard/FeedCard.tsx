import CardMainContent from './CardMainContent';
import CardMainImage from './CardMainImage';
import CardTopSection from './CardTopSection';
import CardUtilSection from './CardUtilSection';

export default function FeedCard() {
  return (
    <div className="w-full p-4">
      {/* 작성자 ID, 간단한 위치(?) , 프로필 사진 포함 */}
      <CardTopSection></CardTopSection>
      <CardMainImage></CardMainImage>
      <CardUtilSection></CardUtilSection>
      <CardMainContent></CardMainContent>
    </div>
  );
}

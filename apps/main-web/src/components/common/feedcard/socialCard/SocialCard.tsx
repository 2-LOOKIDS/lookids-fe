import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getFavoriteCount } from '../../../../actions/batch/batch';
import {
  getIsFavorite,
  putFavoriteComment,
} from '../../../../actions/favorite/favorite';
import { getCommentCount } from '../../../../actions/feed/comment';
import { getFeedDetail } from '../../../../actions/feed/FeedCard';
import { getPetDetail } from '../../../../actions/user';
import { PetDetail } from '../../../../types/user';
import { formatDate } from '../../../../utils/formatDate';
import { getMediaUrl } from '../../../../utils/media';
import { SocialCardSkeleton } from '../../../ui/Skeletons/SocialCardSkeleton';
import SocialCardReaction from './FeedCardReactSection';
import { PetModal } from './PetModal';
import { ShareModal } from './ShareModal';

export default function SocialCard({
  isDetail,
  feedCode,
}: {
  isDetail: boolean;
  feedCode: string;
}) {
  const router = useRouter();
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetDetail | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 상태 관리
  const [feedDetail, setFeedDetail] = useState<any>(null);
  const [petDetails, setPetDetails] = useState<PetDetail[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Feed Detail 가져오기
        const feedData = await getFeedDetail(feedCode);
        setFeedDetail(feedData);

        // 반려동물 정보 가져오기
        if (feedData?.petCode) {
          const pets = await Promise.all(
            feedData.petCode.map((petCode: string) => getPetDetail(petCode))
          );
          setPetDetails(pets);
        }

        // 좋아요 카운트 및 상태 가져오기
        const [likeData, favoriteState] = await Promise.all([
          getFavoriteCount(feedCode, '피드'),
          getIsFavorite(feedCode),
        ]);
        setLikeCount(likeData?.count ?? 0);
        setIsLiked(favoriteState ?? false);

        // 댓글 수 가져오기
        const comments = await getCommentCount(feedCode);
        setCommentCount(comments?.commentCount ?? 0);
      } catch (error) {
        console.error('데이터 로드 중 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [feedCode]);

  // 좋아요 토글
  const toggleLike = async () => {
    try {
      if (!feedDetail) return;

      // Optimistic UI
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

      // 서버 요청
      await putFavoriteComment(feedDetail.uuid, feedCode, '피드');
    } catch (error) {
      console.error(`좋아요 등록 중 실패: ${error}`);

      // 실패 시 상태 롤백
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  if (isLoading || !feedDetail) {
    return <SocialCardSkeleton />;
  }

  return (
    <>
      <Card
        className={`h-2/5 overflow-hidden p-4 ${isDetail ? 'border-0' : ''}`}
      >
        {isDetail && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden"
          >
            {feedDetail.mediaUrlList.map((url: string, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  src={getMediaUrl(url)}
                  alt={`Feed image ${index + 1}`}
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {!isDetail && (
          <div className="relative">
            <Link href={`/feed/${feedCode}`}>
              <Image
                src={`${getMediaUrl(feedDetail.mediaUrlList?.[0] || '')}`}
                width={500}
                height={300}
                alt="Feed image"
                className="w-full rounded-lg object-cover"
              />
            </Link>
          </div>
        )}
        <CardContent className="mt-4 px-2">
          <div className="flex items-start justify-between">
            <div
              className="mb-4 flex items-center space-x-4 hover:cursor-pointer"
              onClick={() =>
                router.push(`/user/${feedDetail.nickname}-${feedDetail.tag}`)
              }
            >
              <Avatar>
                <AvatarImage
                  src={getMediaUrl(feedDetail.image)}
                  alt={feedDetail.nickname}
                  className="object-cover"
                />
                <AvatarFallback>RF</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-md font-extrabold text-black">
                  {feedDetail.nickname}
                </h3>
                <p className="text-xs text-black">{`@${feedDetail.tag}`}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {formatDate(feedDetail.createdAt)}
            </p>
          </div>
          <p className="w-full text-sm text-gray-400 text-ellipsis whitespace-pre-wrap">
            {feedDetail.content}
          </p>
          {petDetails.length > 0 && (
            <div className="py-3">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
                반려동물
              </h4>
              <div className="flex flex-wrap gap-2">
                {petDetails.map((pet, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-1 cursor-pointer"
                    onClick={() => {
                      setSelectedPet(pet);
                      setIsPetModalOpen(true);
                    }}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={getMediaUrl(pet.image)}
                        alt={pet.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {pet.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <SocialCardReaction
            feedCode={feedCode}
            isLiked={isLiked}
            likeCount={likeCount}
            commentCount={commentCount}
            onToggleLike={toggleLike}
            onShareClick={() => setIsShareModalOpen(true)}
          />
        </CardContent>
      </Card>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={`https://lookids.online/feed/${feedCode}`}
      />
      <PetModal
        isOpen={isPetModalOpen}
        onClose={() => setIsPetModalOpen(false)}
        pet={selectedPet}
      />
    </>
  );
}

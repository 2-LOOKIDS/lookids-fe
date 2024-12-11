'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  getIsFavorite,
  putFavoriteComment,
} from '../../../actions/favorite/favorite';
import { getFeedDetail } from '../../../actions/feed/FeedCard';
import { getPetDetail } from '../../../actions/user';
import { SocialCardSkeleton } from '../../../components/ui/Skeletons/SocialCardSkeleton'; // Skeleton 추가
import { FeedDetail } from '../../../types/feed/FeedType';
import { PetDetail } from '../../../types/user';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';
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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [isPetModalOpen, setIsPetModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PetDetail | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [petDetail, setPetDetail] = useState<PetDetail[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [feedDetail, setFeedDetail] = useState<FeedDetail>({
    uuid: '',
    tag: '',
    nickname: '',
    image: '',
    content: '',
    tagList: [],
    mediaUrlList: [],
    createdAt: '',
    feedCode: '',
    petCode: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // 로딩 시작
        const [feedData, isFavorite] = await Promise.all([
          getFeedDetail(feedCode),
          getIsFavorite(feedCode),
        ]);
        setFeedDetail(feedData);
        setIsLiked(isFavorite);

        if (feedData.petCode) {
          const petDetails = await Promise.all(
            feedData.petCode.map((petCode) => getPetDetail(petCode))
          );
          setPetDetail(petDetails);
        }
      } catch (error) {
        console.error('Error fetching feed data:', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, [feedCode]);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const toggleLike = async (feedDetail: FeedDetail) => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    try {
      await putFavoriteComment(feedDetail.uuid, feedDetail.feedCode, '피드');
    } catch (error) {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount + 1 : likeCount - 1);
      console.error(`좋아요 등록 중 실패: ${error}`);
    }
  };

  if (isLoading) {
    return <SocialCardSkeleton />;
  }

  return (
    <>
      <Card
        className={`h-2/5 overflow-hidden p-4 ${isDetail ? 'border-0' : ''}`}
      >
        {/* Social Card Image */}
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

        {isDetail && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden"
          >
            {feedDetail.mediaUrlList.map((url, index) => (
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
          <p
            className={`w-full text-sm text-gray-400 line-clamp-2 text-ellipsis whitespace-pre-wrap ${
              isDetail ? '' : 'line-clamp-2'
            }`}
          >
            {feedDetail.content}
          </p>
        </CardContent>

        {petDetail.length > 0 && (
          <div className="px-2 py-3 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              반려동물
            </h4>
            <div className="flex flex-wrap gap-2">
              {petDetail.map((pet, index) => (
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

        {/* SocialCard Reaction Section */}
        <CardFooter>
          <SocialCardReaction
            isLiked={isLiked}
            likeCount={likeCount}
            onToggleLike={() => toggleLike(feedDetail)}
            onShareClick={handleShareClick}
          />
        </CardFooter>
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

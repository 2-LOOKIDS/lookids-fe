import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
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

  const { data: feedDetail, error: feedError } = useSWR(
    `/api/feed/${feedCode}`,
    () => getFeedDetail(feedCode),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const { data: isLiked, mutate: mutateIsLiked } = useSWR(
    `/api/favorite/${feedCode}`,
    () => getIsFavorite(feedCode),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const { data: petDetails, error: petError } = useSWR(
    feedDetail?.petCode
      ? `/api/pets?codes=${feedDetail.petCode.join(',')}`
      : null,
    () =>
      feedDetail?.petCode
        ? Promise.all(
            feedDetail.petCode.map((petCode) => getPetDetail(petCode))
          )
        : Promise.resolve([]),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const { data: likeCount } = useSWR(`/api/favorite/count/${feedCode}`, () =>
    getFavoriteCount(feedCode, '피드')
  );

  const { data: commentCount } = useSWR(`/api/comments/count/${feedCode}`, () =>
    getCommentCount(feedCode)
  );

  const toggleLike = async () => {
    try {
      if (!feedDetail) return;
      mutateIsLiked(!isLiked, false); // Optimistic UI 업데이트
      await putFavoriteComment(feedDetail.uuid, feedCode, '피드');
    } catch (error) {
      console.error(`좋아요 등록 중 실패: ${error}`);
      mutateIsLiked(!isLiked, false); // 실패 시 상태 롤백
    }
  };

  if (!feedDetail || !likeCount || !commentCount) {
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
            {feedDetail.mediaUrlList.map((url, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    src={getMediaUrl(url)}
                    alt={`Feed image ${index + 1}`}
                    width={500}
                    height={300}
                    className="w-full object-cover"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {/* Feed 이미지 및 내용 표시 */}
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

        {/* 나머지 Card 내용 */}
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
          {petDetails && petDetails.length > 0 && (
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
          {/* Reaction Section */}
          <SocialCardReaction
            feedCode={feedCode}
            isLiked={isLiked ?? false}
            likeCount={likeCount?.count ?? 0}
            commentCount={commentCount?.commentCount ?? 0}
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

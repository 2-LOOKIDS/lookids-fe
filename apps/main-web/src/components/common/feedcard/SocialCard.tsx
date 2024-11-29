'use client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';

import { Heart, Share2, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FeedDetail, getFeedDetail } from '../../../actions/feed/FeedCard';
import { formatDate } from '../../../utils/formatDate';
import { getMediaUrl } from '../../../utils/media';

export default function SocialCard({
  isDetail,
  feedCode,
}: {
  isDetail: boolean;
  feedCode: string;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [feedDetail, setFeedDetail] = useState<FeedDetail>({});
  useEffect(() => {
    const fetchFeedDetail = async (feedCode: string) => {
      try {
        const data = await getFeedDetail(feedCode);

        setFeedDetail(data);
      } catch (error) {
        console.log('피드 데이터 에러', error);
      }
    };
    fetchFeedDetail(feedCode);
  }, [feedCode]);
  return (
    <Card className={`h-2/5 overflow-hidden p-4 ${isDetail ? 'border-0' : ''}`}>
      {/* Social Card Image */}
      <div className="relative">
        <Link href={`/feed/${feedCode}`}>
          <Image
            src={`${getMediaUrl(feedDetail.mediaUrlList)}`}
            width={500}
            height={300}
            alt="Cartoon cat sleeping on a green couch"
            className="w-full rounded-lg object-cover"
          />
        </Link>
        {!isDetail && (
          <div
            className={`absolute right-3 top-3 rounded-full p-2 ${isLiked ? 'bg-red-500' : 'opacity-50 bg-gray-800'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              fill="white"
              className={`h-4 w-4 ${isLiked ? 'text-white' : 'text-gray-300'}`}
            />
          </div>
        )}
      </div>
      <CardContent className="mt-4 px-2">
        <div className="flex items-start justify-between">
          <div className="mb-4 flex items-center space-x-4">
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
          className={`w-full text-sm text-gray-400 line-clamp-2 text-ellipsis whitespace-pre-wrap ${isDetail ? '' : 'line-clamp-2'}`}
        >
          {feedDetail.content}
        </p>
      </CardContent>

      {/* SocialCard Reaction Section */}
      <CardFooter className="flex gap-x-5 border-t border-gray-100 px-2 py-3 text-xs text-gray-400">
        <ul className="flex items-center gap-x-2">
          <li>
            <ThumbsUp className="text-lookids h-4 w-4" />
          </li>
          <li>{`${178} Likes`}</li>
        </ul>
        <ul className="flex items-center gap-x-2">
          <li>
            <Share2 className="text-lookids h-4 w-4" />
          </li>
          <li>{`${12} Shares`}</li>
        </ul>
      </CardFooter>
    </Card>
  );
}

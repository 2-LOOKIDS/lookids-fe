import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';

import { Heart, Share2, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

export default function SocialCard({
  isDetail,
  feedCode = '1',
}: {
  isDetail: boolean;
  feedCode?: string;
}) {
  return (
    <Card className={`m-4 h-2/5 overflow-hidden ${isDetail ? 'border-0' : ''}`}>
      {/* Social Card Image */}
      <section className="relative">
        <Link href={`/feed/${feedCode}`}>
          <img
            src="/pome.jpg"
            alt="Cartoon cat sleeping on a green couch"
            className="w-full rounded-lg object-cover"
          />
        </Link>
        {!isDetail && (
          <div className="absolute right-3 top-3 rounded-full bg-red-500 p-2">
            <Heart className="h-4 w-4 text-white" />
          </div>
        )}
      </section>
      <CardContent className="mt-2 px-2">
        <div className="mb-4 flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/jihunpistol.jpg" alt="Jihun Sin" />
            <AvatarFallback>RF</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700">Jihun Sin</h3>
            <p className="text-xs text-gray-500">15/12/2023</p>
          </div>
        </div>
        <p
          className={`text-sm text-gray-600 ${isDetail ? '' : 'line-clamp-2'}`}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          facere exercitationem odio nulla mollitia nihil quos nostrum dolor,
          laboriosam, velit, ducimus ex officiis debitis et laudantium nemo sit.
          Quos, molestiae doloribus maiores perferendis, a vitae officia laborum
          illo magnam placeat culpa expedita velit quisquam obcaecati.
          Doloribus, ratione at sunt voluptatem quas quaerat dolorum quidem.
          Sapiente architecto facilis consequatur voluptas officiis modi illo
          nulla vero nam molestias, maxime aperiam cupiditate quam pariatur odio
        </p>
      </CardContent>

      {/* SocialCard Reaction Section */}
      <CardFooter className="flex gap-x-3 border-t border-gray-100 px-2 py-3 text-xs text-gray-400">
        <ul className="flex items-center gap-x-1">
          <li>
            <ThumbsUp className="text-lookids  h-4 w-4" />
          </li>
          <li>{`${178} Likes`}</li>
        </ul>
        <ul className="flex items-center gap-x-1">
          <li>
            <Share2 className="text-lookids  h-4 w-4" />
          </li>
          <li>{`${12} Shares`}</li>
        </ul>
      </CardFooter>
    </Card>
  );
}

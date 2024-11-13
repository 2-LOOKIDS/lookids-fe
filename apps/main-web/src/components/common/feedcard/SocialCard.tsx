import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';

import { Heart, Share2, ThumbsUp } from 'lucide-react';

export default function SocialCard({ isDetail }: { isDetail: boolean }) {
  return (
    <Card
      className={`m-4 h-2/5 overflow-hidden p-4 ${isDetail ? 'border-0' : ''}`}
    >
      <div className="relative">
        <img
          src="/pome.jpg"
          alt="Cartoon cat sleeping on a green couch"
          className="h-[200px] w-full rounded-t-lg object-cover"
        />
        <div className="absolute right-3 top-3 rounded-full bg-red-500 p-2">
          <Heart className="h-4 w-4 text-white" />
        </div>
      </div>
      <CardContent className="px-2">
        <div className="mb-4 flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/jihunpistol.jpg" alt="Robert Fox" />
            <AvatarFallback>RF</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700">Robert Fox</h3>
            <p className="text-xs text-gray-500">15/12/2023</p>
          </div>
        </div>
        <p
          className={`mb-4 text-sm text-gray-600 ${isDetail ? '' : 'line-clamp-2'}`}
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

      <CardFooter className="border-t border-gray-100 px-4 py-3">
        <div className="flex space-x-6 text-xs text-gray-500">
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-4 w-4 text-violet-600" />
            <span>178 Likes</span>
          </div>
          <div className="flex items-center">
            <Share2 className="mr-1 h-4 w-4 text-violet-600" />
            <span>12 Shares</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

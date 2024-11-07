import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@repo/ui/components/ui/card";

import { Heart, Share2, ThumbsUp } from "lucide-react";

export default function SocialCard() {
  return (
    <Card className="m-4 p-4 h-2/5 overflow-hidden">
      <div className="relative">
        <img
          src="/pome.jpg"
          alt="Cartoon cat sleeping on a green couch"
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3 bg-red-500 rounded-full p-2">
          <Heart className="w-4 h-4 text-white" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src="/jihunpistol.jpg" alt="Robert Fox" />
            <AvatarFallback>RF</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700">Robert Fox</h3>
            <p className="text-xs text-gray-500">15/12/2023</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore...
        </p>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t border-gray-100">
        <div className="flex space-x-6 text-gray-500 text-xs">
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1 text-violet-600" />
            <span>178 Likes</span>
          </div>
          <div className="flex items-center">
            <Share2 className="w-4 h-4 mr-1 text-violet-600" />
            <span>12 Shares</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

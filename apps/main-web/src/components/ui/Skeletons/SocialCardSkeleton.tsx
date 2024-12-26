'use client';

import { Card, CardContent, CardFooter } from '@repo/ui/components/ui/card';

export function SocialCardSkeleton({
  isDetail = false,
}: {
  isDetail?: boolean;
}) {
  return (
    <Card className={`h-2/5 overflow-hidden p-4 ${isDetail ? 'border-0' : ''}`}>
      <div className="relative">
        <div className="w-full h-[300px] bg-gray-200 rounded-lg animate-pulse" />
        {!isDetail && (
          <div className="absolute right-3 top-3 w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
        )}
      </div>

      <CardContent className="mt-4 px-2">
        <div className="flex items-start justify-between">
          <div className="mb-4 flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse" />

              <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
        <div className="w-full h-4 bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
      </CardContent>

      <CardFooter className="flex gap-x-5 border-t border-gray-100 px-2 py-3">
        <div className="flex items-center gap-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
        </div>
      </CardFooter>
    </Card>
  );
}

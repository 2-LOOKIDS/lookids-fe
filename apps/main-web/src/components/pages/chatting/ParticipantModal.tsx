'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';

import { Button } from '@repo/ui/components/ui/button';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { getMediaUrl } from '../../../utils/media';

interface Participant {
  nickname: string;
  tag: string;
  tierCode: string;
  birthDate: string | null;
  gender: string | null;
  comment: string | null;
  image: string;
}

export default function ParticipantModal({
  participant,
  isOpen,
  onClose,
}: {
  participant: Participant;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lookids">유저 정보</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={getMediaUrl(participant.image)}
                alt={participant.nickname}
              />
              <AvatarFallback>
                {participant.nickname.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <section className="flex justify-between gap-6">
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-lg font-semibold">
                    {participant.nickname}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Tag: {participant.tag}
                  </p>
                </div>
              </div>
              <Link
                href={`/user/${participant.nickname}-${participant.tag}`}
                passHref
              >
                <Button variant="outline" size="sm" className="border-lookids">
                  <UserIcon className="w-4 h-4 mr-2 text-lookids" />
                  프로필 페이지
                </Button>
              </Link>
            </section>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">티어</p>
              <p className="text-sm text-muted-foreground">
                {participant.tierCode}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">생일</p>
              <p className="text-sm text-muted-foreground">
                {participant.birthDate || '비공개'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">성별</p>
              <p className="text-sm text-muted-foreground">
                {participant.gender || '비공개'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">한줄 소개</p>
              <p className="text-sm text-muted-foreground">
                {participant.comment || 'No comment'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  deleteSubscribe,
  getIsSubscribed,
  postSubscribe,
} from '../../../actions/subscribe/subscribe';
import { MenuItem } from '../../../types/common/MenuType';
import CommonMenu from '../../common/CommonMenu';

interface HeaderProps {
  loginId: string;
  uuid: string;
}

export default function ProfileHeader({ loginId, uuid }: HeaderProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const checkSubscribe = async () => {
    const data = await getIsSubscribed(uuid);
    setIsSubscribed(data.subscribed);
  };
  useEffect(() => {
    checkSubscribe();
  }, [uuid]);
  const menuItems: MenuItem[] = [
    {
      label: '유저 신고하기',
      onClick: () => {
        Swal.fire({
          title: '유저를 신고하시겠습니까?',
          html: '유저를 신고하면 해당 <br>유저의 활동이 제한됩니다.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '신고',
          cancelButtonText: '취소',
        });
      },
    },

    {
      label: '유저 차단하기',
      onClick: () => {
        Swal.fire({
          title: '유저를 차단하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '차단',
          cancelButtonText: '취소',
        });
      },
    },
    ...(isSubscribed
      ? [
          {
            label: '유저 알림 받지 않기',
            onClick: async () => {
              const result = await Swal.fire({
                title: '해당 유저의 알림을 받지 않으시겠습니까?',
                showCancelButton: true,
                confirmButtonText: '알림 받지 않기',
                cancelButtonText: '취소',
              });
              if (result.isConfirmed) {
                const res = await deleteSubscribe(uuid);
                Swal.fire({
                  title: '알림 설정 완료',
                  text: '해당 유저의 알림을 받지 않습니다.',
                  icon: 'success',
                  confirmButtonText: '확인',
                });
                checkSubscribe();
              }
            },
          },
        ]
      : [
          {
            label: '유저 알림받기',
            onClick: async () => {
              console.log('찍히나', uuid);
              const result = await Swal.fire({
                title: '해당 유저의 알림을 받으시겠습니까?',
                showCancelButton: true,
                confirmButtonText: '알림받기',
                cancelButtonText: '취소',
              });
              if (result.isConfirmed) {
                const res = await postSubscribe(uuid);

                Swal.fire({
                  title: '알림 설정 완료',
                  text: '해당 유저의 알림을 받습니다.',
                  icon: 'success',
                  confirmButtonText: '확인',
                });
                checkSubscribe();
              }
            },
          },
        ]),
  ];
  return (
    <header className="relative flex justify-center px-5 pt-12">
      <div
        className="absolute left-4 hover:cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <ChevronLeft />
      </div>
      <div className="absolute right-4">
        <CommonMenu menuItems={menuItems} />
      </div>
      <h1 className="sr-only">Lookids, 루키즈 | {loginId}</h1>
      <h2 className="font-semibold ">{loginId}</h2>
    </header>
  );
}

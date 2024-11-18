'use client';
import CommonHeader from '../../../components/ui/SignUpHeader';
import { MenuItem } from '../../../types/common/MenuType';

export default function layout({
  // modal,
  children,
}: {
  // modal: React.ReactNode;
  children: React.ReactNode;
}) {
  const feedMenuItems: MenuItem[] = [
    { label: '피드 신고하기', onClick: () => alert('피드를 신고했습니다.') },
    { label: '피드 삭제하기', onClick: () => alert('피드를 삭제했습니다.') },
    { label: '작성자 차단', onClick: () => alert('작성자를 차단했습니다.') },
    { label: '피드 저장하기', onClick: () => alert('피드를 저장했습니다.') },
    { label: '링크 복사하기', onClick: () => alert('링크를 복사했습니다.') },
  ];
  return (
    <>
      <CommonHeader
        title={'피드상세'}
        ismenu={true}
        menuItems={feedMenuItems}
      ></CommonHeader>
      {/* {modal} */}
      {children}
    </>
  );
}

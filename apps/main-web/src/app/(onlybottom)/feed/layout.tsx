import CommonHeader from '../../../components/ui/CommonHeader';

export default function layout({
  // modal,
  children,
}: {
  // modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonHeader title={'피드상세'}></CommonHeader>
      {/* {modal} */}
      {children}
    </>
  );
}

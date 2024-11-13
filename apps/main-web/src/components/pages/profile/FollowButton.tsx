import { Button } from '@repo/ui/components/ui/button';
import { PlusIcon } from 'lucide-react';
import React from 'react';

function FollowButton() {
  return (
    <Button className="w-2/5 rounded-[12px] bg-[#FD9340] py-5 text-white hover:bg-[#FD9340]/90">
      <p className="font-poppins text-base font-semibold leading-6">Follow</p>
      <PlusIcon className="h-5 w-5" />
    </Button>
  );
}

export default FollowButton;

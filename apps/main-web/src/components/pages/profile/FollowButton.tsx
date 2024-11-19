import { Button } from '@repo/ui/components/ui/button';
import { PlusIcon } from 'lucide-react';
import React from 'react';

function FollowButton() {
  return (
    <Button className="bg-lookids hover:bg-lookids/90 w-3/5 rounded-[12px] py-5 text-white">
      <p className="font-poppins text-base font-semibold leading-6">Follow</p>
      <PlusIcon className="h-5 w-5" />
    </Button>
  );
}

export default FollowButton;

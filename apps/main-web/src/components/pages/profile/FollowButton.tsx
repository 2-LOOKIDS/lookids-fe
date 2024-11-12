import { Button } from "@repo/ui/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

function FollowButton() {
  return (
    <Button className="w-2/5 bg-[#FD9340] hover:bg-[#FD9340]/90 text-white rounded-[12px] py-5">
      <p className="font-poppins font-semibold text-base leading-6">Follow</p>
      <PlusIcon className="w-5 h-5" />
    </Button>
  );
}

export default FollowButton;

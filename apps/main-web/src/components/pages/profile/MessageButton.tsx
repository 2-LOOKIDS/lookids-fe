import { Button } from "@repo/ui/components/ui/button";
import React from "react";

function MessageButton() {
  return (
    <Button
      variant="outline"
      className="w-2/5 border border-[#FD9340] text-[#FD9340] hover:bg-[#FD9340] hover:text-white rounded-[12px] py-5 sm:p-2"
    >
      <p className="font-poppins font-semibold text-base leading-6">
        메시지 보내기
      </p>
    </Button>
  );
}

export default MessageButton;

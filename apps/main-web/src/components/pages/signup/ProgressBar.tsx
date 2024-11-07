import React from "react";

interface ProgressBarProps {
  step: number;
  totalStep: number;
}
export default function ProgressBar({
  step,
  totalStep: totalStep,
}: ProgressBarProps) {
  return (
    <div className="flex items-start gap-2 mx-7 mt-[39px] mb-[55px]">
      {Array.from({ length: totalStep }, (_, index) => (
        <div
          key={index}
          className={`h-[3px] flex-1 rounded-full ${
            index === step ? "bg-[#FD9340]" : "bg-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

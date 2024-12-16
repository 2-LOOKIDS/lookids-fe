import React from 'react';

interface ProgressBarProps {
  step: number;
  totalStep: number;
}
export default function ProgressBar({
  step,
  totalStep: totalStep,
}: ProgressBarProps) {
  return (
    <div className="px-7 pb-[55px] pt-[39px] flex items-start gap-2">
      {Array.from({ length: totalStep }, (_, index) => (
        <div
          key={index}
          className={`h-[3px] flex-1 rounded-full ${
            index === step ? 'bg-[#FD9340]' : 'bg-[#E5E7EB]'
          }`}
        />
      ))}
    </div>
  );
}

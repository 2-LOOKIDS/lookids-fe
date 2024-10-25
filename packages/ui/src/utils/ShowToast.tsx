import CustomToast, { CustomToastProps } from "./CustomToast";

import React from "react";
import { toast } from "../hooks/use-toast";

export default function ShowToast({ message, iconType }: CustomToastProps) {
  return toast({
    description: <CustomToast message={message} iconType={iconType} />,
    duration: 2000,
  });
}

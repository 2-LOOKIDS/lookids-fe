import CustomToast, { CustomToastProps } from './CustomToast';

import { useToast } from '../hooks/use-toast';

export default function ShowToast({ message, iconType }: CustomToastProps) {
  const { toast } = useToast();

  return toast({
    description: <CustomToast message={message} iconType={iconType} />,
    duration: 2000,
  });
}

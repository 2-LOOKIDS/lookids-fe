import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { PetDetail } from '../../../../types/user';
import { getMediaUrl } from '../../../../utils/media';

interface PetModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: PetDetail | null;
}

export function PetModal({ isOpen, onClose, pet }: PetModalProps) {
  if (!pet) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center">{pet.name}의 정보</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={getMediaUrl(pet.image)}
              alt={pet.name}
              className="object-cover"
            />
            <AvatarFallback>{pet.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p className="text-sm text-gray-500">{pet.type}</p>
          </div>
          <div className="w-full text-sm">
            <p>
              <span className="font-semibold">나이:</span> {pet.age}살
            </p>
            <p>
              <span className="font-semibold">성별:</span> {pet.gender}
            </p>
            <p>
              <span className="font-semibold">특징:</span> {pet.comment}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

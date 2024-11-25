export interface Following {
  id: string;
  name: string;
  avatar: string;
}

export interface FollowerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFollower: (followerId: string) => void;
}

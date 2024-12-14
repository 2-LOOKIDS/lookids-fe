export interface getfollowingResponse {
  size: number;
  content: Following[];
}

export interface Following {
  followerUuid: string;
  followingUuid: string;
}

export interface FollowerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFollower?: (followerId: string, followerNickName: string) => void;
}

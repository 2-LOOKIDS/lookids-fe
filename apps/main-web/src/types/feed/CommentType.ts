export interface CommentType {
  commentCode: string;
  userUuid: string;
  nickname: string;
  tag: string;
  image: string;
  content: string;
  createdAt: string;
  replyCount: number;
}

export interface CommentReplyType {
  commentCode: string;
  userUuid: string;
  tag: string;
  nickname: string;
  image: string;
  content: string;
  createdAt: string;
  replyCount: number;
}

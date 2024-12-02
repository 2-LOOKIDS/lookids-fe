export interface CommentType {
  commentCode: string;
  uuid: string;
  nickname: string;
  tag: string;
  image: string;
  content: string;
  createdAt: string;
  replyCount: number;
}

export interface CommentReplyType {
  commentCode: string;
  uuid: string;
  tag: string;
  nickname: string;
  image: string;
  content: string;
  createdAt: string;
}

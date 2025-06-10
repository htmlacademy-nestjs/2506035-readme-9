export interface Comment {
  id?: string;
  createdAt: Date;
  updatedAt: Date;
  postId?: string;
  text: string;
  userId: string;
}

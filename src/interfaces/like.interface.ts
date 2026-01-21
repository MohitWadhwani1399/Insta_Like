import { LikeEvent } from "../enum/likes.enum";

export interface LikeJob {
  userId: string;
  postId: string;
  eventType: LikeEvent;
  timestamp: number;
}

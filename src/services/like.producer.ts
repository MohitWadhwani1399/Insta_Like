import { likeQueue } from "../BullMQ/like.queue";
import { LikeJob } from "../interfaces/like.interface";

export async function addLikeJob(likeJob: LikeJob) {
  await likeQueue.add("like-job", likeJob, {
    jobId: `${likeJob.userId}:${likeJob.postId}`, // For DeDuplication
  });
}

import type { Request, Response } from "express";
import { addLikeJob } from "../services/like.producer";
import { LikeJob } from "../interfaces/like.interface";
import { LikeEvent } from "../enum/likes.enum";
import { redisConnection } from "../config/redis";
export class LikeController {
  async like(req: Request, res: Response) {
    const { userId, postId } = req.body;
    // Store key:value in redis for deduplication.
    const dedupKey = `like:${userId}:${postId}`;
    const isFirstLike = await redisConnection.setnx(dedupKey, 1);
    await redisConnection.expireat(dedupKey, 86400);

    if (!isFirstLike) {
      // Duplicate request
      res.status(202).json({ message: "Already Liked" });
    }

    // Insert that Job into message Queue along with redis key value
    if (userId && postId) {
      await addLikeJob({
        userId,
        postId,
        eventType: LikeEvent.Like,
        timestamp: Date.now(),
      } as LikeJob);
      res.status(202).json({ message: "You Liked the Post" });
    } else {
      res.status(400).json({ messsage: "Bad request!!" });
    }
  }

  async unlike(req: Request, res: Response) {
    // 1. create a Job for message Queue.
    // 2. Insert that JOb into message Queue along with redis key value
    // 3. Return acknowledgement to Client.
  }
}

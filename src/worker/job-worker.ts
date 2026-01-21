import { Worker } from "bullmq";
import IORedis from "ioredis";
import { connectionOption } from "../config/redis";
import { LikeJob } from "../interfaces/like.interface";
import { MAX_BUFFER_LENGTH } from "../constants/like.constant";
import { LikeEvent } from "../enum/likes.enum";
import { prisma } from "../database/prisma";

export const redisConnection = new IORedis(connectionOption);

let buffer: LikeJob[] = [];
const jobworker = new Worker(
  "like-queue",
  async (job) => {
    buffer.push(job.data);
    if (buffer.length >= MAX_BUFFER_LENGTH) {
      await flushBufferIntoDb();
    }
  },
  {
    connection: connectionOption,
    concurrency: 10,
  },
);

async function flushBufferIntoDb() {
  const batch = buffer;
  buffer = [];
  const likes = batch.filter((job) => {
    return job.eventType === LikeEvent.Like;
  });

  const unLikes = batch.filter((job) => {
    return job.eventType === LikeEvent.unLike;
  });

  await prisma.$transaction(async (tx) => {
    const likeMap = new Map();
    const insertedLike = await tx.$queryRawUnsafe(
      `INSERT INTO Like (userId,postId,like)
      SELECT userId,postId from UNNEST($1::UUID,$2::UUID(),1)
      ON CONFLICT DO NOTHING
      RETURNING postId`,
      likes.map((l) => l.userId),
      likes.map((l) => l.postId),
    );
    countLikeonPost(insertedLike, likeMap);
    await incrementLikeCountOnPosts(insertedLike, likeMap);
  });
}

function countLikeonPost(insertedLike: any, likeMap: Map<String, number>) {
  const rows = insertedLike.rows;
  for (let post of rows) {
    likeMap.set(post.postId, (likeMap.get(post.postId) || 0) + 1);
  }
}

async function incrementLikeCountOnPosts(
  insertedLike: any,
  likeMap: Map<String, number>,
) {
  for (let [postId, count] of likeMap.entries()) {
    await prisma.$queryRawUnsafe(
      `UPDATE Post SET likeCount = likeCount + $1 WHERE id = $2`,
      count,
      postId,
    );
  }
}

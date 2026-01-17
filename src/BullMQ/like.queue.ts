import { Queue } from "bullmq";

import { redisConnection } from "../config/redis";

export const likeQueue = new Queue("like-queue", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 3000 },
    removeOnComplete: true,
    removeOnFail: true,
  },
});

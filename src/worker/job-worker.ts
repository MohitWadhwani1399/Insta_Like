import { Worker } from "bullmq";
import IORedis from "ioredis";
import { connectionOption } from "../config/redis";

export const redisConnection = new IORedis(connectionOption);
const jobworker = new Worker(
  "like-queue",
  async (job) => {
    console.log(
      `Processing Job with Job Id: ${job.id} and Data is: ${JSON.stringify(job.data)}`,
    );
  },
  {
    connection: connectionOption,
    concurrency: 10,
  },
);

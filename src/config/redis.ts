import IORedis from "ioredis";
export const connectionOption = {
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
};
export const redisConnection = new IORedis(connectionOption);

redisConnection.on("connect", () => {
  console.log("Connected to Redis");
});

redisConnection.on("error", (err) => {
  console.log("Error while connecteing to Redis:", err);
});

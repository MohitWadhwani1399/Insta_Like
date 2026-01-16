import express, {Express} from "express";
import cors from "cors";
import likeRoute from "./routes/likes.routes";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", likeRoute);

export default app;
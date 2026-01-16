import {Router} from "express";
import { LikeController } from "../controllers/like.controllers";

const router = Router();
const controller = new LikeController();
router.post("/like",controller.like.bind(controller));
router.post("/unlike",controller.unlike.bind(controller));


export default router;
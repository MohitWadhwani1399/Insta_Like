import type { Request, Response } from "express";
import { addLikeJob } from "../services/like.producer";
import { LikeJob } from "../interfaces/like.interface";
export class LikeController{
    async like(req: Request, res: Response){
        // 1. create a Job for message Queue.
        const {userId, postId} = req.body;        
        // 2. Insert that JOb into message Queue along with redis key value 
        await addLikeJob({userId,postId,like:1} as LikeJob);        
        // 3. Return acknowledgement to Client.       
        res.status(200).json({message: "Like Queued"}); 
    }

    async unlike(req: Request, res: Response){
        // 1. create a Job for message Queue.
        // 2. Insert that JOb into message Queue along with redis key value 
        // 3. Return acknowledgement to Client.
    }


}
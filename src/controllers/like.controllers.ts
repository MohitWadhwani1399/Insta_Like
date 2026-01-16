import type { Request, Response } from "express";
export class LikeController{

    async like(req: Request, res: Response){
        // 1. create a Job for message Queue.
        // 2. Insert that JOb into message Queue along with redis key value 
        // 3. Return acknowledgement to Client.        
    }

    async unlike(req: Request, res: Response){
        // 1. create a Job for message Queue.
        // 2. Insert that JOb into message Queue along with redis key value 
        // 3. Return acknowledgement to Client.
    }


}
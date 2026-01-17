export interface LikeJob{
    userId: string;
    postId: string;
    like: 1 | -1;
}
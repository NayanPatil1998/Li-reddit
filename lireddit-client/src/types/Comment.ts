import { Post } from "./post";

export interface Comment {
    createdAt: Date;
    updatedAt: Date;
    identifier: string;
    body: string;
    username: string;
    // votes: Vote[];
    userVote: number;
    voteScore: number;
    post?: Post
}
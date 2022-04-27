import { Comment } from "./Comment";
import { SubReddit } from "./sub";

export interface Post {
    identifier: string;

    slug: string;

    title: string;

    body: string;

    username: string;

    commentCount: number;
    voteScore: number

    subName: string;
    sub : SubReddit
    comments: Comment[];
    userVote : number

    createdAt: Date;

    updatedAt: Date;

}
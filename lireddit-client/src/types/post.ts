export interface Post {
    identifier: string;

    slug: string;

    title: string;

    body: string;

    username: string;

    commentCount: number;
    voteScore: number

    subName: string;

    comments: any;
    userVote : number

    createdAt: Date;

    updatedAt: Date;

}
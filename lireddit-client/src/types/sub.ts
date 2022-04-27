import { Post } from "./post";

export interface SubReddit {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    title: string;
    description: string;
    imageUrn?: string;
    bannerUrn?: string;
    posts: Post[]
    username: string

}

export interface TrendingSubs {
    name: string;
    title: string;
    postCount: string
    imageUrl: string
}
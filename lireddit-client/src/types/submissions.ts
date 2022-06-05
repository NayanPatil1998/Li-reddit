import { Comment } from "./Comment";
import { Post } from "./post";
import { User } from "./user";

interface submission {
    posts: Post[],
    comments : Comment[]
}

export interface Submissions {
    user: User;
    submissions : submission
}
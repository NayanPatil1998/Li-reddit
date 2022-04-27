import { Comment } from "../types/Comment"
import { Post } from "../types/post"
import { axios } from "./axios"

export const fetchCommentsByPost = async (slug : string, identifier: string ) => {
    const response = await axios.get<Comment[]>(`/comments/${identifier}/${slug}`)
    // console.log(response.data)
    return response
}

export const voteComment = async ({ postSlug, postIdentifier, commentIdentifier, value }) => {
    const response = await axios.post<Post>("/votes", {
        "commentIdentifier": commentIdentifier,
        "slug": postSlug,
        "identifier" : postIdentifier,
        "value": value
    })
    // console.log(response)
    return response;
}

export const postComment = async ({body, slug, identifier}) => {
    const response  = await axios.post<Comment>("/comments/create", {
        "identifier" : identifier,
        "slug" : slug,
        "body" : body
    })

    return response
}

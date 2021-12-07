import { Post } from "../types/post"
import { axios } from "./axios"

export const getPosts = async () => {
    const response = await axios.get<Post[]>('/posts')
    // console.log(response.data)
    return response.data
}

export const votePost = async ({ slug, identifier, value }) => {
    const response = await axios.post<Post>("/votes", {
        "identifier": identifier,
        "slug": slug,
        "value": value
    })
    console.log(response.data)
    return response.data;
}
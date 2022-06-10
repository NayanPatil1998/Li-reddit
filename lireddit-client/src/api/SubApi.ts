import { CancelTokenSource } from "axios"
import { SubReddit, TrendingSubs } from "../types/sub"
import { axios } from "./axios"

export const getSub = async (subName: string) => {
    const response = await axios.get<SubReddit>(`/subreddits/${subName}`)
    // console.log(response.data)
    return response
}

export const getTrendingSubs = async () => {
    const response = await axios.get<TrendingSubs[]>("/subreddits/topsubs")
    // console.log(response.data)
    return response
}

export const createSub = async ({title, name, description}) => {
    const response = await axios.post('/subreddits/create', {
        "title": title,
        "name": name,
        "description": description
    })
    return response
}



export const updateImage = async ({file, type, subName}) => {

    const formData = new FormData()

    formData.append('file', file)
    formData.append('type', type)

    const response = axios.post<SubReddit>(`/subreddits/${subName}/image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response

}
export const searchsubs = async (subQuery: string, cancelToken: CancelTokenSource) => {
    const response = await axios.get<SubReddit>(`/subreddits/search/${subQuery}`, {cancelToken: cancelToken.token})
    // console.table(response.data)
    return response
}

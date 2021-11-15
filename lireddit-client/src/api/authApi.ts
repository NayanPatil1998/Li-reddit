import { axios } from "./axios"

export const register = async ({username, email, password}) => {
    const response = await axios.post('/auth/register', {
        "email": email,
        "username" : username,
        "password" : password,
    })
    return response
}
export const login = async ({emailOrUsername, password}) => {
    const response = await axios.post('/auth/login', {
        "emailOrUsername": emailOrUsername,
        "password" : password,
    })
    return response
}
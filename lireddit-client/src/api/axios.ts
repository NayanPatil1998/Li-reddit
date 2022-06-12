import Axios from "axios";
import { BASE_URL } from "../utils/constants";


export const axios = Axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
    
    
})

// const cache = new LRU({ max: 10 })

// configure({ axios, cache })
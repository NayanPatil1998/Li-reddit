import Axios from "axios";


export const axios = Axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true,
    
    
})

// const cache = new LRU({ max: 10 })

// configure({ axios, cache })
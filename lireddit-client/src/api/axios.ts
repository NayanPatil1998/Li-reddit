import Axios from "axios";


export const axios = Axios.create({
    baseURL: "http://44.193.75.249/",
    withCredentials:true,
    
    
})

// const cache = new LRU({ max: 10 })

// configure({ axios, cache })
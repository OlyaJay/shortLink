import axios from "axios"

const API_URL = 'http://localhost:3000'

export const createShortLink = async (originURL:string):Promise<string> =>{
    const responce = await axios.post(`${API_URL}/shortURL`, {originURL})
    return responce.data.shortURL
}

export const getAllLinks = async()=>{
    const responce = await axios.get(`${API_URL}/allLinks`)
    return responce.data
}

export const deletLink = async(shortURL:string) =>{
    await axios.delete(`${API_URL}/delete/${shortURL}`)
}
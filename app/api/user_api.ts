import axios from "axios";
import ApiManager from "./ApiManager";

interface ILogin{
    email:string
    password:string
}

export const user_login = async (data: ILogin | URL | Request) => {
    try {
        console.log(" before fetch data")
        const result = await ApiManager.post("/auth/login", {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            data:data,
        })
        return result
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data
        }
        else {
            return ("something went wrong")
        }
    }
}
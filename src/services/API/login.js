import { useMutation } from "@tanstack/react-query"
import { AUTH_API } from "../axiosInstance"

export const useLogin = ()=>{
    return useMutation({
        mutationFn: async(payload)=>{
            return await AUTH_API.post(`login/signin`, payload)
        }
    })
}
import { useQuery, useMutation } from "@tanstack/react-query"
import {API} from "./axiosInstance"


export const useGetAllStaff  = (company_id) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.get(`package/getAllStaff/${company_id}`)
            return res?.data?.data
          },
          queryKey: ["staff"]
    })
  }

export const useGetAllDepartment  = (company_id) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.get(`package/get_departments/${company_id}`)
                 return res?.data?.data
          },
          queryKey: ["dept"]
    })
  }



  export const useGetAllUnits  = (company_id) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.get(`package/get_units/${company_id}`)
            return res?.data?.data
          },
          queryKey: ["units"]
    })
  }
  
  export const useGetAllRegion  = (company_id) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.get(`package/get_region/${company_id}`)
            return res?.data?.data
          },
          queryKey: ["region"]
    })
  }
  
  export const useGetAllDirectorate  = (company_id) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.get(`package/get_directorates/${company_id}`)
            return res?.data?.data
          },
          queryKey: ["directo"]
    })
  }

  export const useGetApprovalStaff = (payload) => {
    const approvalStaff = useQuery({
      queryKey: ["get_approval", ],
      queryFn: async()=>{
        const res = await API.post(`leave/getApprovalStaff`, payload)
        return res?.data?.data
      }
    })
    return approvalStaff;
  }
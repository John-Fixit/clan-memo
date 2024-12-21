import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {API} from "../axiosInstance"
import { API_URL } from "../api_url"


export const useGetLatestMemo  = (payload) => {
    //payload will be {staff_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.latestMemo, payload)
            return res?.data?.data? res?.data?.data?.sort((a, b) => {
              return new Date(b.DATE_CREATED) - new Date(a.DATE_CREATED);
            }): []
          },
          queryKey: ["latest_memo"]
    })
  }
export const useGetActivities  = (payload) => {
    //payload will be {staff_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.activityTimeline, payload)
            return res?.data?.data? res?.data?.data?.sort((a, b) => {
              return new Date(b.DATE_CREATED) - new Date(a.DATE_CREATED);
            }): []
          },
          queryKey: ["get_activities"]
    })
  }
export const useViewFolder  = (payload) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.view_folder, payload)
            return res?.data?.requests
          },
          queryKey: [`${payload?.status}_folder`]
    })
  }
export const useViewFolderByStatus  = () => {
    const viewFolder = useMutation({
        mutationFn:async(payload)=>{
            return await API.post(API_URL.view_folder, payload)
        }
    })
    return viewFolder
  }
export const useViewMemo  = (payload) => {
    //payload will be {memo_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.view_memo, payload)
            return res?.data
          },
          queryKey: ["view_memo"],
          refetchOnMount: false
    })
  }


  export const useGetMyApprovals  = (payload) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.my_approvals, payload)
            return res?.data?.requests
          },
          queryKey: [`${payload?.status}_approval`]
    })
  }

  export const useGetMyApprovalsByStatus  = () => {
    const getMyApprovals = useMutation({
        mutationFn:async(payload)=>{
            return await API.post(API_URL.my_approvals, payload)
        }
    })
    return getMyApprovals
  }
  export const useApproveMemo  = (isApprove) => {
    const queryClient = useQueryClient();
    const approveOrDeclineMemo = useMutation({
        mutationFn:async(payload)=>{
            const res = await API.post(isApprove?API_URL.approve_memo: API_URL.decline_memo, payload)
            return res?.data
        },
        onSuccess: ()=>{
          queryClient.invalidateQueries(["_approval"])
          queryClient.invalidateQueries(["pending_approval"])
          queryClient.invalidateQueries(["approved_approval"])
          queryClient.invalidateQueries(["declined_approval"])
        }
    })
    return approveOrDeclineMemo
  }


  export const useGetFileStatus  = (payload) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.list_file_status, payload)
            return res?.data?.data
          },
          queryKey: [`list_file_status`]
    })
  }
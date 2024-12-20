import { useQuery } from "@tanstack/react-query"
import {API} from "../axiosInstance"
import { API_URL } from "../api_url"


export const useGetLatestMemo  = (payload) => {
    //payload will be {staff_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.latestMemo, payload)
            return res?.data?.data
          },
          queryKey: ["latest_memo"]
    })
  }
export const useGetActivities  = (payload) => {
    //payload will be {staff_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.activityTimeline, payload)
            return res?.data?.data
          },
          queryKey: ["get_activities"]
    })
  }
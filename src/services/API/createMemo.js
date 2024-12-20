import { useMutation } from "@tanstack/react-query";
import { API } from "../axiosInstance";
import { API_URL } from "../api_url";

export const useCreateMemo = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(API_URL.create_memo, payload);
    },
  });
};
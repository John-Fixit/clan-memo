import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";
import { API_URL } from "../api_url";

export const useCreateMemo = ({updateDraft}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(updateDraft? API_URL.update_draft_memo : API_URL.create_memo, payload);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["latest_memo"])
      queryClient.invalidateQueries(["_folder"])
      queryClient.invalidateQueries(["list_file_status"])
    }
  });
};


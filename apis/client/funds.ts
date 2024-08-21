import { API_ROUTES } from "@/constants/ApiRoutes";
import { useQuery } from "@tanstack/react-query";
import api from "../axios";

export function useGetFundsAll() {
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [API_ROUTES.FUNDS.ALL],
    queryFn: async () => {
      const response = await api.get(API_ROUTES.FUNDS.ALL);
      return response.data; 
    },
  });

  return {
    data,
    isSuccess,
    isLoading,
    isError,
  };
}

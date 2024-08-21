import { useMutation } from "@tanstack/react-query";
import api from "../axios";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { signIn } from "@/components/redux/authSlice";
import { AppDispatch } from "@/components/redux/store";

export function useAgentLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: agentLogin, isPending, data, error } = useMutation({
    mutationFn: async (data: any) => {
      
        const response = await api.post(API_ROUTES.USER.LOGIN, data);
        // console.log(response, "response");
        
        if (response.data.access_token) {
          return response;
        } else {
          throw new Error('Incorrect email & password');
        }
      
    },
    onSuccess: (response) => {
      const token = response.data.access_token;
      dispatch(signIn(token));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Login successful',
      });
      router.replace('/');
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: (error as Error).message ,
      });
    },
  });

  return { agentLogin, isPending, data, error };
}

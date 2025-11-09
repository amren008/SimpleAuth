import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser, logoutUser, signupUser } from "../api/auth";

export const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], { user: data.user });
      navigate("/dashboard"); // Navigate after successful signup
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["currentUser"], { user: data.user });
      navigate("/dashboard"); // Navigate after successful login
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!localStorage.getItem("token"),
    retry: false,
  });
};

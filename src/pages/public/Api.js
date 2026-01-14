import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-instance/index";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";
import { AuthContext } from "../../contexts";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

async function getBanner() {
  const data = await axiosInstance({
    url: "/banners",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetBanner() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.banner],
    queryFn: () => getBanner(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
}

async function getSurah() {
  const data = await axiosInstance({
    url: "/surah",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetSurah() {
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.surah],
    queryFn: () => getSurah(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return { data, isLoading, isError, error };
}

async function getPrograms() {
  const data = await axiosInstance({
    url: "/programmes",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetPrograms() {
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.programs],
    queryFn: () => getPrograms(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return { data, isLoading, isError, error };
}

async function sendMessage(formData) {
  const data = await axiosInstance({
    url: `/enquiries`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useSendMessage(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => sendMessage(formData),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options.onSettled?.(data, error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

async function getEvent() {
  const data = await axiosInstance({
    url: "/events",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetEvent() {
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.events],
    queryFn: () => getEvent(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return { data, isLoading, isError, error };
}

async function getCampaigns() {
  const data = await axiosInstance({
    url: "/campaigns",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetCampaigns() {
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.campaigns],
    queryFn: () => getCampaigns(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return { data, isLoading, isError, error };
}

async function getCampaignsDonor() {
  const data = await axiosInstance({
    url: "/campaigns/donorCampaigns",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetCampaignsDonor() {
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKeys.campaignsDonor],
    queryFn: () => getCampaignsDonor(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return { data, isLoading, isError, error };
}

async function registerUser(formData) {
  const data = await axiosInstance({
    url: "/authentication/register",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useRegisterUser(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => registerUser(formData),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options.onSettled?.(data, error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

async function LoginUser(formData) {
  const data = await axiosInstance({
    url: "/authentication/login",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return data?.data;
}

export function useUserlogin(options = {}) {
  const navigate = useNavigate();
  const { authenticate } = useContext(AuthContext);

  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => LoginUser(formData),
    onSuccess: (data) => {
      const token = data?.accessToken;
      if (!token) return;

      authenticate(token);
      navigate("/userprofile", { replace: true });
    },
    onError: options.onError,
  });

  return { mutate, ...mutation };
}

async function resetPassword(formData) {
  const data = await axiosInstance({
    url: "/authentication/resetpassword",
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useResetPassword(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => resetPassword(formData),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options.onSettled?.(data, error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

async function verifyEmail(formData) {
  const data = await axiosInstance({
    url: "/authentication/verify-email",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useVerifyEmail(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => verifyEmail(formData),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options.onSettled?.(data, error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

async function forgotPassword(formData) {
  const data = await axiosInstance({
    url: "/authentication/forgotpassword",
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useForgotPassword(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => forgotPassword(formData),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options.onSettled?.(data, error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

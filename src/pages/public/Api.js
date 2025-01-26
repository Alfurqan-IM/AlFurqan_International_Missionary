import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-instance/index";
import { queryKeys } from "../../react-query/constants";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";

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

export function useSendMessage() {
  const queryClient = useQueryClient();
  const { mutate, isSuccess, reset, isError, error } = useMutation({
    mutationFn: (formData) => sendMessage(formData),

    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.user]);
    },
  });
  return { mutate, isSuccess, reset, isError, error };
}

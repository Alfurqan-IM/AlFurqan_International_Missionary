import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-instance";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";

export function useGetUser(userId) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${userId}`);
      return res.data;
    },
    enabled: !!userId,
  });
}

async function updateUserProfile({ userId, payload }) {
  const res = await axiosInstance({
    url: `/users/${userId}`,
    method: "PATCH",
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,

    onMutate: async ({ payload }) => {
      await queryClient.cancelQueries(["user"]);
      const previousUser = queryClient.getQueryData(["user"]);

      queryClient.setQueryData(["user"], (old) => ({
        ...old,
        ...payload,
      }));

      return { previousUser };
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["user"], context.previousUser);
      toast.error("Failed to update profile", toastOptions);
    },

    onSuccess: () => {
      toast.success("Profile updated successfully", toastOptions);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
}

async function uploadProfileImage({ userId, image }) {
  const formData = new FormData();
  formData.append("image", image);

  const res = await axiosInstance({
    url: `/users/${userId}/upload`,
    method: "PATCH",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export function useUploadProfileImage() {
  return useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: () => {
      toast.success("Image uploaded successfully", toastOptions);
    },
    onError: () => {
      toast.error("Image upload failed", toastOptions);
    },
  });
}

async function registerProgram(formData) {
  const data = await axiosInstance({
    url: `/registerations`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useRegisterProgram(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => registerProgram(formData),
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

async function updatePassword(formData) {
  const data = await axiosInstance({
    url: `/authentication/updatepassword`,
    method: "PATCH",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useUpdatePassword(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => updatePassword(formData),
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

async function createFeedbacks(formData) {
  const data = await axiosInstance({
    url: `/feedbacks`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useCreateFeedback(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => createFeedbacks(formData),
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

async function subscribe({ userId, subscription }) {
  const data = await axiosInstance({
    url: subscription
      ? `/users/${userId}/subscribe`
      : `/users/${userId}/unsubscribe`,
    method: "PATCH",
    data: subscription ? { subscribe: true } : { unSubscribe: true },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data?.data;
}

export function useSubscribe(options = {}) {
  const { mutate, ...mutation } = useMutation({
    mutationFn: subscribe,
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

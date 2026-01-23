import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-instance";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils";
import { queryKeys } from "../../react-query/constants";

async function getProgramsTitle() {
  const data = await axiosInstance({
    url: "/programmes/title",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export function useGetProgramsTitle() {
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['programstitle'],
    queryFn: () => getProgramsTitle(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return { data, isLoading, isError, error };
}

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
    onError: (error) => {
      console.log("uploaerror", error);
      toast.error("Image upload failed", toastOptions);
    },
  });
}

async function getMyRegistrations() {
  const data = await axiosInstance({
    url: "/registerations/me",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}
export function useMyRegistrations() {
  const fallback = [];
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.myRegistrations],
    queryFn: () => getMyRegistrations(),
    onError: (error) => {
      toast.error(error, toastOptions);
    },
  });
  return data;
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
  const queryClient = useQueryClient();
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => registerProgram(formData),
    onSuccess: (data, variables, context) => {
      options.onSuccess?.(data, variables, context);
      queryClient.invalidateQueries([queryKeys.myRegistrations]);
      toast.success("Registration successful", toastOptions);
      getMyRegistrations();
      options.onSuccess?.();
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
      toast.error(error.message || "Registration Failed", toastOptions);
    },
    onSettled: (data, error, variables, context) => {
      options.onSettled?.(data, error, variables, context);
    },
  });

  return { mutate, ...mutation };
}

async function updateRegistration({ id, payload }) {
  const res = await axiosInstance({
    url: `/registerations/${id}`,
    method: "PATCH",
    data: payload,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export function useUpdateRegistration(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRegistration,

    onSuccess: () => {
      queryClient.invalidateQueries(["my-registrations"]);
      options.onSuccess?.();
      toast.success("Programme updated successfully", toastOptions);
    },
    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);

      toast.error(
        error.response?.data?.message[0] || "Programme Update Failed",
        toastOptions
      );
    },
  });
}

async function deleteRegistration(id) {
  return axiosInstance.delete(`/registerations/${id}`);
}

export function useDeleteRegistration() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteRegistration,
    onSuccess: () => {
      qc.invalidateQueries(["my-registrations"]);
      toast.success("Programme deleted successfully", toastOptions);
    },
    onError: (error, variables, context) => {
      toast.error(
        error.response?.data?.message[0] || "Programme Delete Failed",
        toastOptions
      );
    },
  });
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
  const qc = useQueryClient();
  const { mutate, ...mutation } = useMutation({
    mutationFn: (formData) => createFeedbacks(formData),
    onSuccess: () => {
      qc.invalidateQueries(["my-feedbacks"]);
      options.onSuccess?.();
      toast.success("Feedback sent successfully", toastOptions);
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

async function getMyFeedbacks() {
  const res = await axiosInstance.get("/feedbacks/my");
  return res.data;
}

export function useMyFeedbacks() {
  return useQuery({
    queryKey: ["my-feedbacks"],
    queryFn: getMyFeedbacks,
  });
}

async function updateFeedback({ id, payload }) {
  const res = await axiosInstance.patch(`/feedbacks/${id}`, payload);
  return res.data;
}

export function useUpdateFeedback(options = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateFeedback,
    onSuccess: () => {
      qc.invalidateQueries(["my-feedbacks"]);
      options.onSuccess?.();
      toast.success("Feedback updated successfully", toastOptions);
    },
  });
}

async function deleteFeedback(id) {
  return axiosInstance.delete(`/feedbacks/${id}`);
}

export function useDeleteFeedback() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      qc.invalidateQueries(["my-feedbacks"]);
      toast.success("Feedback deleted successfully", toastOptions);
    },
  });
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

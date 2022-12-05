import axios, { AxiosError } from "axios";
import {
  BasicTaskInfo,
  ConnectAnswer,
  FourChoiceAnswer,
  ResultInfo,
  TherapistProfileInfo,
} from "./CommonTypes";

const axiosBase = axios.create({
  baseURL: "http://172.26.5.2",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeout: 5000,
});

export const fetchTherapistList = async (user: string) =>
  await axiosBase
    .get<TherapistProfileInfo[]>("/api/user/list/therapists/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });
export async function login(values: { email: string; password: string }) {
  return await axiosBase.post("/api/user/login/", values).then((res) => {
    return res.data;
  });
}

export async function register(values: {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
}) {
  return await axiosBase
    .post("/api/user/patient/register/", values)
    .then((res) => {
      return res.data;
    });
}

export const fetchDefaultTasks = async (user: string) =>
  await axiosBase
    .get<BasicTaskInfo[]>("/api/task/tasks/?default=true", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });

export const fetchTaskById = async (
  id: string | undefined,
  user: string,
  taskType: string
) =>
  await axiosBase
    .get(`/api/task/tasks/${id}/`, {
      params: { task_type: taskType },
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error: AxiosError) => {
      throw error;
    });

export const postTaskAnswer = async (
  user: string,
  taskId: string,
  taskType: string,
  taskAnswer: {
    answer: ConnectAnswer | FourChoiceAnswer[];
  }[]
) =>
  await axiosBase.post(
    "/api/task/results/",
    { task: taskId, answers: taskAnswer },
    {
      params: {
        task_type: taskType,
      },
      headers: {
        Authorization: `Token ${user}`,
      },
    }
  );

export const fetchRandomDefaultTask = async (user: string) =>
  await axiosBase
    .get<BasicTaskInfo>("/api/task/tasks/get_random_task/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });

export const fetchTaskResults = async (user: string) =>
  await axiosBase
    .get<ResultInfo[]>("api/task/results/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });

export const fetchMyProfile = async (user: string) =>
  await axiosBase
    .get("/api/user/patient/myprofile/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });

export async function patchMyProfile(
  user: string,
  values: {
    name?: string;
    email?: string;
    image?: File;
    password?: string;
    confirm_password?: string;
  }
): Promise<any> {
  return await axiosBase
    .patch("/api/user/patient/myprofile/", values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${user}`,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export const fetchTherapistInfo = async (
  id: string | undefined,
  user: string
) =>
  await axiosBase
    .get(`/api/user/list/therapist/${id}/`, {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });

export async function linkRequest(
  user: string,
  code: { therapist_code: string }
): Promise<any> {
  return await axiosBase.patch("/api/user/patient/link/", code, {
    headers: { Authorization: `Token ${user}` },
  });
}

export async function unlink(user: string): Promise<any> {
  return await axiosBase.patch(
    "/api/user/patient/unlink/",
    {},
    {
      headers: { Authorization: `Token ${user}` },
    }
  );
}

import { BasicTaskInfo, ConnectTask, FourChoicesTask } from "./CommonTypes";
import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://172.26.5.2",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export async function fetchTherapistList(user: string): Promise<any> {
  return await axiosBase
    .get("/api/user/list/therapists/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });
}

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

export async function fetchDefaultTasks(
  user: string
): Promise<BasicTaskInfo[]> {
  return await axiosBase
    .get("/api/task/tasks/?default=true", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });
}

export async function fetchConnectTask(
  id: string | undefined,
  user: string
): Promise<any> {
  return await axiosBase
    .get(`/api/task/tasks/${id}/`, {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });
}

export async function postConnectTaskAnswers(
  user: string,
  taskId: string,
  taskAnswer: {
    answer: { data1: string; data2: string; isCorrect: boolean }[];
  }[]
) {
  return axiosBase.post(
    "/api/task/results/",
    { task: taskId, answers: taskAnswer },
    {
      headers: {
        Authorization: `Token ${user}`,
      },
    }
  );
}

export async function fetchRandomDefaultTask(
  user: string
): Promise<BasicTaskInfo> {
  return await axiosBase
    .get("/api/task/tasks/get_random_task/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });
}

export async function fetchMyProfile(user: string): Promise<any> {
  return await axiosBase
    .get("/api/user/patient/myprofile/", {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });
}

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

export async function fetchTherapistInfo(
  id: string | undefined,
  user: string
): Promise<any> {
  return await axiosBase
    .get(`/api/user/list/therapist/${id}/`, {
      headers: { Authorization: `Token ${user}` },
    })
    .then((res) => {
      return res.data;
    });
}

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

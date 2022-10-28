import { BasicTaskInfo, ConnectTask, FourChoicesTask } from "./CommonTypes";
import axios from "axios";

export async function fetchTherapistList(user: string): Promise<any> {
  return await fetch("http://172.26.5.2/api/user/list/therapists/", {
    method: "GET",
    headers: { Authorization: `Token ${user}` },
  }).then((data) => {
    return data.json();
  });
}

export async function login(values: { email: string; password: string }) {
  return await fetch("http://172.26.5.2/api/user/login/", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function register(values: {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
}) {
  return await fetch("http://172.26.5.2/api/user/patient/register/", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchDefaultTasks(
  user: string
): Promise<BasicTaskInfo[]> {
  return await fetch("http://172.26.5.2/api/task/tasks/", {
    method: "GET",
    headers: { Authorization: `Token ${user}` },
  }).then((res) => {
    return res.json();
  });
}

export async function fetchConnectTask(
  id: string | undefined,
  user: string
): Promise<any> {
  return await fetch(`http://172.26.5.2/api/task/tasks/${id}/`, {
    method: "GET",
    headers: { Authorization: `Token ${user}` },
  }).then((res) => {
    return res.json();
  });
}

export async function postConnectTaskAnswers(
  user: string,
  taskId: string,
  taskAnswer: {
    answer: { data1: string; data2: string; isCorrect: boolean }[];
  }[]
) {
  return fetch("http://172.26.5.2/api/task/results/", {
    method: "POST",
    body: JSON.stringify({ task: taskId, answers: taskAnswer }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${user}`,
    },
  });
}

export async function fetchRandomDefaultTask(
  user: string
): Promise<BasicTaskInfo> {
  return await fetch("http://172.26.5.2/api/task/tasks/get_random_task/", {
    method: "GET",
    headers: { Authorization: `Token ${user}` },
  }).then((res) => {
    return res.json();
  });
}

export async function fetchMyProfile(user: string): Promise<any> {
  return await fetch("http://172.26.5.2/api/user/patient/myprofile/", {
    method: "GET",
    headers: { Authorization: `Token ${user}` },
  }).then((res) => {
    return res.json();
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
  return await axios
    .patch("http://172.26.5.2/api/user/patient/myprofile/", values, {
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
  return await fetch(`http://172.26.5.2/api/user/list/therapist/${id}/`, {
    method: "GET",
    headers: { Authorization: `Token ${user}` },
  }).then((res) => {
    return res.json();
  });
}

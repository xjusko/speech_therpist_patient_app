export async function fetchTherapistList(user: string): Promise<any> {
  return await fetch("http://172.26.5.2/api/user/list/?therapist_only=1", {
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
  return await fetch("http://172.26.5.2/api/user/register/patient/", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function fetchDefaultTasks(user: string): Promise<any> {
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

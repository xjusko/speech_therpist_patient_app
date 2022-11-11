export type Choice = {
  id: number;
  data1: string;
  data2: string;
};

export type Question = {
  id: number;
  heading: string;
  choices: Choice[];
};

export type ConnectTask = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  created_by: number;
  questions: Question[];
  tags: string[];
};

export type FourChoicesTask = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  questions: {
    main: Choice;
    options: Choice[];
  }[];
};

export type BasicTaskInfo = {
  id: number;
  name: string;
  type: string;
  difficulty: string;
  tags: any[];
  created_by: number;
};

export type QuestionAnswer = ChoiceAnswer[];

export type ChoiceAnswer = { data1: string; data2: string; isCorrect: boolean };

export type AccountInfo = {
  id: number;
  name: string;
  email: string;
  image: string;
  assigned_tasks: BasicTaskInfo[];
  assigned_to: string;
  assignment_active: boolean;
};

export type TherapistProfileInfo = {
  id: number;
  name: string;
  location: string;
  company: string;
  country: string;
  email: string;
  image: string;
  phone: string;
  bio: string;
  assigned_patients_count: number;
};

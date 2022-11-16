export type Pair = {
  id: number;
  data1: string;
  data2: string;
};

export type FourChoice = {
  id: number;
  question_data: string;
  correct_option: string;
  incorrect_option1: string;
  incorrect_option2: string;
  incorrect_option3: string;
};

export type ConnectQuestion = {
  id: number;
  choices: Pair[];
};

export type FourChoiceQuestion = {
  id: number;
  choices: FourChoice[];
};

export type ConnectTask = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  created_by: number;
  questions: ConnectQuestion[];
  tags: string[];
};

export type FourChoicesTask = {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  questions: FourChoiceQuestion[];
};

export type BasicTaskInfo = {
  id: number;
  name: string;
  type: string;
  difficulty: string;
  tags: any[];
  created_by: number;
  isDone?: boolean;
};

export type ConnectAnswer = PairAnswer[];

export type PairAnswer = { data1: string; data2: string; is_correct: boolean };

export type FourChoiceAnswer = {
  question_data: string;
  correct_option: string;
  incorrect_option1: string;
  incorrect_option2: string;
  incorrect_option3: string;
  chosen_option: string;
  is_correct: boolean;
};

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

export type ResultInfo = {
  id: number;
  answered_by: number;
  task: number;
};

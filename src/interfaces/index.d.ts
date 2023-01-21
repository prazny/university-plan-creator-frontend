import internal from "stream";

export interface IFaculty {
  id: int,
  name: string;
}

export interface IField {
  id: int,
  name: string;
  profile: string;
  level: string;
  faculty_id: int;
}

export interface ICourse {
  id: number;
  name: string;
  ects: number;
  cnps: number;
  zzu: number;
  bu: number;
  hours_count: number;
  code: string;
  type: Type;
  completing_form: string;
  course_form: Form;
}

export interface IOpinion {
  is_approved: boolean;
  description: string;
  status: OpinionStatus;
  user_id: int;
  plan_id: int;
}

export interface IPlans {
  id: int,
  year: number;
  form: string;
  number_of_semesters: number;
  lang: string;
  field_id: number;
}

export interface ISemester {
  id: int,
  max_ects_deficit: int;
  semester_number: int;
}

export interface IUser {
  id: int;
  login: string;
  email: string;
}

enum OpinionStatus {
  Positive,
  Negative,
}

enum Type {
  laboratory,
  practice,
  lecture,
  project,
  seminar,
  lang_course,
  thesis,
}

enum Form {
  stationary,
  remote,
}

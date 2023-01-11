import internal from "stream";

export interface IFaculty {
    name: string;
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
    completing_form: string
    course_form: Form
}

export interface IOpinion {
    is_approved: boolean
    description: string
    status: OpinionStatus
    user: string
    plan: string
}

enum OpinionStatus {
    Positive,
    Negative
}

enum Type {
    laboratory,
    practice,
    lecture,
    project,
    seminar,
    lang_course,
    thesis
}

enum Form {
    stationary,
    remote
}

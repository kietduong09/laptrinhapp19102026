export type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  lecturer: string;
  room: string;
  progress: number;
  color: string;
  grade: string;
};

export type Assignment = {
  id: string;
  title: string;
  courseId: string;
  due: string;
  dueLabel: string;
  type: string;
  completed: boolean;
  description: string;
};

export type ClassSession = {
  id: string;
  courseId: string;
  day: string;
  date: string;
  start: string;
  end: string;
  room: string;
  kind: string;
};

export type Student = {
  id: string;
  name: string;
  className: string;
  major: string;
  email: string;
  phone: string;
};

export type Grade = {
  id: string;
  courseId: string;
  score: string;
  letter: string;
  note: string;
};

export type StudyStackParamList = {
  Home: undefined;
  Courses: undefined;
  Schedule: undefined;
  Assignments: undefined;
  Profile: undefined;
  CourseDetail: { courseId: string };
  SessionDetail: { sessionId: string };
  AssignmentDetail: { assignmentId: string };
  GradeDetail: { gradeId: string };
};

export type TabParamList = {
  Overview: undefined;
  Courses: undefined;
  Schedule: undefined;
  Assignments: undefined;
  Profile: undefined;
};

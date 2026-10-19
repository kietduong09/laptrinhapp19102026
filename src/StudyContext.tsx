import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { assignmentSeed, studentSeed } from './data';
import { Assignment, Student } from './types';

type StudyState = {
  assignments: Assignment[];
  student: Student;
  toggleAssignment: (id: string) => void;
  saveStudent: (student: Student) => void;
};

const StudyContext = createContext<StudyState | undefined>(undefined);
const ASSIGNMENTS_KEY = '@study-manager/assignments';
const STUDENT_KEY = '@study-manager/student';

export function StudyProvider({ children }: React.PropsWithChildren) {
  const [assignments, setAssignments] = useState(assignmentSeed);
  const [student, setStudent] = useState(studentSeed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const [savedAssignments, savedStudent] = await Promise.all([
        AsyncStorage.getItem(ASSIGNMENTS_KEY),
        AsyncStorage.getItem(STUDENT_KEY),
      ]);
      if (active) {
        if (savedAssignments) {
          setAssignments(JSON.parse(savedAssignments) as Assignment[]);
        }
        if (savedStudent) {
          setStudent(JSON.parse(savedStudent) as Student);
        }
        setReady(true);
      }
    }
    load().catch(error => {
      console.error('Không thể tải dữ liệu học tập đã lưu.', error);
      if (active) {
        setReady(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (ready) {
      AsyncStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments)).catch(
        error => console.error('Không thể lưu trạng thái bài tập.', error),
      );
    }
  }, [assignments, ready]);

  useEffect(() => {
    if (ready) {
      AsyncStorage.setItem(STUDENT_KEY, JSON.stringify(student)).catch(error =>
        console.error('Không thể lưu thông tin sinh viên.', error),
      );
    }
  }, [ready, student]);

  const value = useMemo(
    () => ({
      assignments,
      student,
      toggleAssignment: (id: string) =>
        setAssignments(current =>
          current.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item,
          ),
        ),
      saveStudent: setStudent,
    }),
    [assignments, student],
  );

  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy phải được dùng bên trong StudyProvider.');
  }
  return context;
}

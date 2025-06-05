import { create } from 'zustand';
import axios from 'axios';

export interface StudentClassRow {
  id: string;
  name: string;
  teacher: string;
}

interface StudentStore {
  myClasses: StudentClassRow[];
  loadStudentClasses: () => void;
}

/* useStudentStore.ts */
export const useStudentStore = create<StudentStore>((set) => ({
  myClasses: [],
  async loadStudentClasses() {
    const { data } = await axios.get<StudentClassRow[]>('/api/classes?role=student');
    set({ myClasses: data });
  },
}));

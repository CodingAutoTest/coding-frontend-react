import { create } from 'zustand';
import axios from 'axios';

export interface AssignmentRow {
  problemId: string;
  title: string;
  avgScore: number;
}

interface AssignmentStore {
  assignments: AssignmentRow[];
  loadAssignments: (classId: string) => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  async loadAssignments(classId) {
    const { data } = await axios.get<AssignmentRow[]>(`/api/classes/${classId}/assignments`);
    set({ assignments: data });
  },
}));

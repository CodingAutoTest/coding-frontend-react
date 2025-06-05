import { create } from 'zustand';
import { api } from '@/lib/axios';
import { ClassSummary, ClassDetail } from '../types/class.type';

interface ClassStore {
  classes: ClassSummary[];
  current?: ClassDetail;

  /* actions */
  loadMyClasses: () => void;
  loadClassDetail: (id: string) => void;
  createOrUpdateClass: (p: Partial<ClassDetail>) => Promise<void>;
  inviteStudent: (cId: string, email: string) => Promise<void>;
  removeStudent: (cId: string, sId: string) => Promise<void>;
  getClass: (id: number) => ClassSummary | undefined;
}

/* ---------- 스토어 ---------- */
export const useClassStore = create<ClassStore>((set, get) => ({
  classes: [],

  /* 강사 본인 클래스 목록 */
  async loadMyClasses() {
    const { data } = await api.get<ClassSummary[]>('/classes');
    set({ classes: data });
  },

  /* 특정 클래스 상세 */
  async loadClassDetail(id) {
    const { data } = await api.get<ClassDetail>(`/classes/${id}`);
    set({ current: data });
  },

  /* 생성 or 수정 */
  async createOrUpdateClass(payload) {
    if (payload.id) {
      await api.put(`/classes/${payload.id}`, payload);
    } else {
      await api.post('/classes', payload);
    }
    await get().loadMyClasses();
  },

  /* 학생 초대 */
  async inviteStudent(classId, email) {
    await api.post(`/classes/${classId}/invite`, { email });
    await get().loadClassDetail(classId);
  },

  /* 학생 제거 */
  async removeStudent(classId, studentId) {
    await api.delete(`/classes/${classId}/students/${studentId}`);
    await get().loadClassDetail(classId);
  },

  /* selector */
  getClass: (id) => get().classes.find((c) => c.id === id),
}));

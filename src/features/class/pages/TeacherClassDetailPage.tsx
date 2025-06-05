import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClassSummary, AssignmentRow } from '../types/class.type';
import { getAssignments, getClassDetail } from '../api/class.api';
import InviteForm from '../components/InviteForm';
import StudentTable from '../components/StudentTable';
import AssignmentTable from '../components/AssignmentTable';

export default function TeacherClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [classData, setClassData] = useState<ClassSummary | null>(null);
  const [assignments, setAssignments] = useState<AssignmentRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const [classDetail, assignmentsData] = await Promise.all([
            getClassDetail(id),
            getAssignments(id),
          ]);
          setClassData(classDetail);
          setAssignments(assignmentsData);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleInviteSuccess = () => {
    // TODO: 학생 목록 새로고침
  };

  if (!classData) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{classData.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">학생 초대</h2>
          <InviteForm classId={id!} onSuccess={handleInviteSuccess} />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">학생 목록</h2>
            <StudentTable classId={id!} students={[]} onRemove={handleInviteSuccess} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">과제 목록</h2>
          <AssignmentTable assignments={assignments} />
        </div>
      </div>
    </div>
  );
}

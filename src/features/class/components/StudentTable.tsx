import { Student } from '../types/class.type';
import { removeStudent } from '../api/class.api';

interface StudentTableProps {
  classId: string;
  students: Student[];
  onRemove: () => void;
}

export default function StudentTable({ classId, students, onRemove }: StudentTableProps) {
  const handleRemove = async (studentId: string) => {
    try {
      await removeStudent(classId, studentId);
      onRemove();
    } catch (error) {
      console.error('Failed to remove student:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              이메일
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                  onClick={() => handleRemove(student.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  제거
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

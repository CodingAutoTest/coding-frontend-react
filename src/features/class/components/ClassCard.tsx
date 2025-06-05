import { ClassSummary } from '../types/class.type';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '@/utils/date';

interface ClassCardProps {
  classData: ClassSummary;
}

const ClassCard = ({ classData }: ClassCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/class/${classData.id}`)}
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={classData.createdBy.profileImage}
          alt={classData.createdBy.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{classData.name}</h3>
          <p className="text-sm text-gray-500">강사: {classData.createdBy.name}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{classData.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <span>학생 {classData.studentCount}명</span>
          <span>과제 {classData.assignmentCount}개</span>
        </div>
        <span>생성일: {formatDate(classData.createdAt)}</span>
      </div>
    </div>
  );
};

export default ClassCard;

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyClassDetails } from '../data/dummyClasses';
import { formatDate, formatDateTime, formatRelativeTime } from '@/utils/date';
import { useAuthStore } from '@/stores/useAuthStore';

const ClassDetailPage = () => {
  const { classId } = useParams<{ classId: string }>();
  const user = useAuthStore((s) => s.user);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const classData = dummyClassDetails[Number(classId)];
  if (!classData) {
    return <div>클래스를 찾을 수 없습니다.</div>;
  }

  const isTeacher = user?.role === 'teacher';

  const handleInviteStudent = () => {
    // TODO: API 연동
    console.log('Invite student:', inviteEmail);
    setShowInviteForm(false);
    setInviteEmail('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{classData.name}</h1>
          <p className="text-gray-600">{classData.description}</p>
        </div>
        {isTeacher && (
          <button
            onClick={() => setShowInviteForm(true)}
            className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
          >
            학생 초대하기
          </button>
        )}
      </div>

      {showInviteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">학생 초대하기</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">학생 이메일</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                  placeholder="학생의 이메일을 입력하세요"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowInviteForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  취소
                </button>
                <button
                  onClick={handleInviteStudent}
                  className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
                >
                  초대하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 학생 목록 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">학생 목록</h2>
          <div className="space-y-4">
            {classData.students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-500">가입일: {formatDate(student.joinedAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">해결한 문제: {student.solvedCount}개</p>
                  <p className="text-sm text-gray-500">
                    마지막 활동: {formatRelativeTime(student.lastActiveAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 과제 목록 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">과제 목록</h2>
          <div className="space-y-4">
            {classData.assignments.map((assignment) => (
              <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{assignment.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      assignment.status === 'ONGOING'
                        ? 'bg-green-100 text-green-800'
                        : assignment.status === 'UPCOMING'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {assignment.status === 'ONGOING'
                      ? '진행 중'
                      : assignment.status === 'UPCOMING'
                        ? '예정'
                        : '종료'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                <div className="text-sm text-gray-500">
                  <p>시작: {formatDateTime(assignment.startDate)}</p>
                  <p>종료: {formatDateTime(assignment.endDate)}</p>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">문제 목록:</h4>
                  <div className="flex flex-wrap gap-2">
                    {assignment.problems.map((problem) => (
                      <span key={problem.id} className="px-2 py-1 bg-gray-200 rounded text-sm">
                        {problem.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;

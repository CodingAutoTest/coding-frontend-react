import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import { dummyClasses } from '../data/dummyClasses';

const StudentClassListPage = () => {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleJoinClass = () => {
    // TODO: API 연동
    console.log('Join class with code:', inviteCode);
    setShowInviteForm(false);
    setInviteCode('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">내 클래스</h1>
        <button
          onClick={() => setShowInviteForm(true)}
          className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
        >
          클래스 참여하기
        </button>
      </div>

      {showInviteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">클래스 참여하기</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">초대 코드</label>
                <input
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                  placeholder="초대 코드를 입력하세요"
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
                  onClick={handleJoinClass}
                  className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
                >
                  참여하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyClasses.map((classData) => (
          <ClassCard key={classData.id} classData={classData} />
        ))}
      </div>
    </div>
  );
};

export default StudentClassListPage;

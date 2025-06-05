import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassCard from '../components/ClassCard';
import { dummyClasses } from '../data/dummyClasses';
import { CreateClassRequest } from '../types/class.type';

const TeacherClassListPage = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [newClass, setNewClass] = useState<CreateClassRequest>({
    name: '',
    description: '',
  });

  const handleCreateClass = () => {
    // TODO: API 연동
    console.log('Create class:', newClass);
    setIsCreating(false);
    setNewClass({ name: '', description: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">내 클래스</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
        >
          새 클래스 만들기
        </button>
      </div>

      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">새 클래스 만들기</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">클래스 이름</label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                  placeholder="클래스 이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">클래스 설명</label>
                <textarea
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-PRIMARY"
                  rows={4}
                  placeholder="클래스에 대한 설명을 입력하세요"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  취소
                </button>
                <button
                  onClick={handleCreateClass}
                  className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY_DARK transition-colors"
                >
                  만들기
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

export default TeacherClassListPage;

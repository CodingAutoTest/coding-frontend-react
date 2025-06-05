import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrUpdateClass } from '../api/class.api';

interface ClassFormProps {
  initialData?: {
    id: string;
    name: string;
    description?: string;
  };
}

export default function ClassForm({ initialData }: ClassFormProps) {
  const navigate = useNavigate();
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const classData = await createOrUpdateClass({
        id: initialData?.id,
        name,
        description,
      });
      navigate(`/class/${classData.id}`);
    } catch (error) {
      console.error('Failed to create/update class:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          클래스 이름
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-PRIMARY focus:ring-PRIMARY"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          설명
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-PRIMARY focus:ring-PRIMARY"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-PRIMARY text-white py-2 px-4 rounded-md hover:bg-PRIMARY/90"
      >
        {initialData ? '수정하기' : '생성하기'}
      </button>
    </form>
  );
}

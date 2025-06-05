import { useState } from 'react';
import { inviteStudent } from '../api/class.api';

interface InviteFormProps {
  classId: string;
  onSuccess: () => void;
}

export default function InviteForm({ classId, onSuccess }: InviteFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await inviteStudent(classId, email);
      setEmail('');
      onSuccess();
    } catch (error) {
      console.error('Failed to invite student:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          학생 이메일
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-PRIMARY focus:ring-PRIMARY"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-PRIMARY text-white py-2 px-4 rounded-md hover:bg-PRIMARY/90 disabled:opacity-50"
      >
        {isLoading ? '초대 중...' : '초대하기'}
      </button>
    </form>
  );
}

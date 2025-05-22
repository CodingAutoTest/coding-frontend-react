import React from 'react';
import { useNavigate } from 'react-router-dom';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center">
        <p className="text-DEFAULT mb-4">로그인이 필요한 서비스입니다.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-PRIMARY text-white rounded-lg hover:bg-PRIMARY/90 cursor-pointer"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

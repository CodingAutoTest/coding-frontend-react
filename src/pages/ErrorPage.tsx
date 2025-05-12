import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import errorImage from '@/assets/500-error.png'; // 이미지 경로에 맞게 수정하세요

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-4 max-w-md">
          <h1 className="text-4xl font-bold text-gray-900">웁스....</h1>
          <h2 className="text-2xl text-gray-800 font-semibold">500 - Server Error</h2>
          <p className="text-gray-500">
            이 페이지는 망가졌거나 무언가 잘못됐습니다.
            <br />
            홈페이지로 돌아가십시오.
          </p>
          <button
            className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition w-fit"
            onClick={() => navigate('/')}
          >
            ⬅ Back to home
          </button>
        </div>

        {/* 이미지 영역 */}
        <div className="flex-1">
          <img
            src={errorImage}
            alt="500 Error"
            className="w-full max-w-md ml-auto "
            draggable={false}
          />
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;

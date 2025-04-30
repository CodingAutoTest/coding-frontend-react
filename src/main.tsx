// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 꼭 추가해야 돼!
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {' '}
      {/* 여기로 감싸야 useNavigate(), Routes 다 정상 */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);

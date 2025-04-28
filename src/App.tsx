import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProblemDetailPage from './pages/ProblemDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/problems/:id" element={<ProblemDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

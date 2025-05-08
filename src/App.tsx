import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProblemDetailPage from './pages/ProblemDetailPage';

import ProfilePage from '@/features/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/user/:userId/profile" element={<ProfilePage />} />

        <Route path="/problems/:id" element={<ProblemDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

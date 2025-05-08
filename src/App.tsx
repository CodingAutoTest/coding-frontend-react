import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProfilePage from '@/features/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/user/:userId/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

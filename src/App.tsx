import './App.css';
import ProblemList from './pages/ProblemList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/problems" element={<ProblemList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

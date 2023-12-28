import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage, Login, Register } from './pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

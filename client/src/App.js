import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage, Login, Register } from './pages';
import ProtectedRoute from './components/routes/protectedRoute';
import PublicRoute from './components/routes/publicRoute';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

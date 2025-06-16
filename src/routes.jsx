import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import AuthPage from './pages/AuthPage';

import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/create" 
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        } 
      />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/AuthPage" element={<AuthPage />} />
    </Routes>
  );
}

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;

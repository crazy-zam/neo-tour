import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Main from './pages/main/Main';
import Trip from './pages/trip/Trip';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="trips/:id" element={<Trip />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

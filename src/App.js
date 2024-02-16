import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Main from './components/pages/Main';
import Trip from './components/pages/Trip';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="trips/:id" element={<Trip />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

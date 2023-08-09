import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Read from './components/Read';
import Update from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <br />
        <h1>React Redux</h1>
        <br />
        <Routes>
          <Route path='/' element={<Create />} />
          <Route path='/read' element={<Read />} />
          <Route path='/edit/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

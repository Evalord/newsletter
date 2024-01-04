import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/signIn/log';
import Home from './pages/home';
import AboutUs from './pages/aboutUs/aboutUs';
import './App.css';
import Create from './pages/create/create';
import Edit from './pages/edit/edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:uuid' element={<Edit />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

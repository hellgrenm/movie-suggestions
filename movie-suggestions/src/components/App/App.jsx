// src/App.jsx
import { Button, Container } from 'react-bootstrap';
import {Navbar} from '../Navbar/Navbar.jsx';
import {Body} from '../Body/Body.jsx';
import {Footer} from  '../Footer/Footer.jsx';
import {About} from '../About/About.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark">

    <Navbar />

    <Routes>
      <Route path='/' element={ <Body/> } />
      <Route path='/about' element={ <About /> } />
    </Routes>

    <Footer />

    </div>

  );
}

export default App;
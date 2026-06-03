// src/App.jsx
import { Button, Container } from 'react-bootstrap';
import {Navbar} from '../Navbar/Navbar.jsx';
import {Body} from '../Body/Body.jsx';
import {Footer} from  '../Footer/Footer.jsx';


function App() {
  return (

    <div className="d-flex flex-column min-vh-100 bg-dark">

    <Navbar />
    <Body />
    <Footer />
    </div>

  );
}

export default App;
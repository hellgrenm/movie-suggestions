import { NavLink } from 'react-router-dom'

export function Navbar(){

    return(
    <header>

    <nav className="navbar navbar-expand  navbar-dark bg-dark ">
      <div className="container-fluid justify-content-start ">

        <a className="navbar-brand ms-1 ms-md-4 " href="#">
          <img src="src\assets\logo.svg" width="30" height="30" alt="logo"/>
        </a>


        <ul className="navbar-nav ">

          <li className="nav-item">
            <NavLink to='/' className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/about' className="nav-link">About</NavLink>
          </li>


        </ul>
         <h1 id="big-name" className="text-center h1 w-100">MOVIEBOX</h1>

      </div>

      
    </nav>
    </header>


    )
}


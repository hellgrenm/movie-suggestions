import { NavLink } from 'react-router-dom'

export function Navbar(){

    return(
    <header>

    <nav className="navbar navbar-expand  navbar-dark bg-dark position-relative">
      <div className="container-fluid justify-content-start ">

        <NavLink to='/' className="nav-link navbar-brand ms-1 ms-md-4 z-1">
          <img src="src\assets\logo.svg" width="30" height="30" alt="logo"/>
        </NavLink>


        <ul className="navbar-nav z-1">

          <li className="nav-item">
            <NavLink to='/' className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/about' className="nav-link">About</NavLink>
          </li>

        </ul>
         <h1 id="big-name" className="position-absolute start-30   h1 m-0 z-0 text-muted"> MOVIEBOX </h1>


      </div>

      
    </nav>
    </header>


    )
}


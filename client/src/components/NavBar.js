import {NavLink} from "react-router-dom";

function NavBar() {

    return (
        <nav>
            <NavLink
            to="/"
            className="nav-link"
            activeClassName="active">Home</NavLink>
            <NavLink
            to="/patients"
            className="nav-link"
            activeClassName="active">Patients Index</NavLink>
            <NavLink
            to="/doctors"
            className="nav-link"
            activeClassName="active">Doctors Index</NavLink>
            <NavLink
            to="/appointments"
            className="nav-link"
            activeClassName="active">Appointments</NavLink>
        </nav>
    )

}

export default NavBar
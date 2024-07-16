import {NavLink} from "react-router-dom";
import style from './appNavBarStyle.css'

function NavBar() {

    return (
        <nav>
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
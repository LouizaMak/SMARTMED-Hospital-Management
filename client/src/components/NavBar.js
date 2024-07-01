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
        </nav>
    )

}

export default NavBar
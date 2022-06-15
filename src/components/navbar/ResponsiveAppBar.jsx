import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./styles/ResponsiveAppBar.css";
import { AuthContext } from "../context/AuthContext";

function ResponsiveAppBar(props) {
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const auth = useContext(AuthContext);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            People & Places
            <TravelExploreIcon />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            {auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/u1/places"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  My Places
                </NavLink>
              </li>
            )}
            {auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/places/new"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Add Place
                </NavLink>
              </li>
            )}
            {auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/places/new"
                  activeClassName="active"
                  className="nav-links"
                  onClick={auth.logout}
                >
                  Logout
                </NavLink>
              </li>
            )}
            {!auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  exact
                  to="/auth"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Register
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default ResponsiveAppBar;

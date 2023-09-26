import { NavLink } from "react-router-dom";

type Props = {}

const Navigation = ({}: Props) => {
  return (
    <div className="navigation">
        <NavLink to="/">
            <li>Comarrr.</li>
        </NavLink>
        <ul>
            <NavLink to="/guess-the-flag" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li>Guess the flag</li>
            </NavLink>
            <NavLink
            to="/guess-the-capitals"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
            <li>Guess the capitals</li>
            </NavLink>
        </ul>
    </div>
  )
}


export default Navigation;
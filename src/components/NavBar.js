import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-5">
        <Link className="navbar-brand" href="/">Questions</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link" to="/change-password">Change Password</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}

import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-5">
        <a class="navbar-brand" href="/">Questions</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <Link className="nav-link" to="/change-password">Change Password</Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
            </ul>
        </div>
        </nav>
    )
}

import NavElement from "../NavElement/NavElement.jsx";

export default function Navbar({handleLogOut, isLoggedIn}){
    return (
        <nav>
                <ul>
                    <li><NavElement path="/">Welcome to my Blog!</NavElement></li>
                </ul>
            </nav>
    )
}
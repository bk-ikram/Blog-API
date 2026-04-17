import NavElement from "../NavElement/NavElement.jsx";

export default function Navbar({handleLogOut, isLoggedIn}){
    return (
        <nav>
                <ul>
                    <li><NavElement path="/">Home</NavElement></li>
                    { isLoggedIn && <li><NavElement path="create">Create Post</NavElement></li>} 
                    { !isLoggedIn &&<li><NavElement path="signin">Sign In</NavElement></li> }
                    { isLoggedIn 
                        && <li>
                            <form onSubmit={(e) => handleLogOut(e,setUser, setToken)}>
                                <button type="submit">Sign Out</button>
                            </form>
                            </li> 
                    }
                </ul>
            </nav>
    )
}
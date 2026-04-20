import NavElement from "../NavElement/NavElement.jsx";

export default function Navbar({handleLogOut, isLoggedIn}){
    return (
        <nav>
                <ul>
                    <li><NavElement path="/">Home</NavElement></li>
                    { isLoggedIn && <li><NavElement path="post/create">Create Post</NavElement></li>} 
                    { !isLoggedIn &&<li><NavElement path="signin">Sign In</NavElement></li> }
                    { isLoggedIn 
                        && <li>
                                <button onClick={(e) => handleLogOut(e)}>Sign Out</button>
                            </li> 
                    }
                </ul>
            </nav>
    )
}
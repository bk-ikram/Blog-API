import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavElement from "../NavElement/NavElement.jsx";

function getPreviousToken() {
  return localStorage.getItem("odinBlogToken");
}
function handleLogOut(e,setUser,setToken){
    e.preventDefault(); //prevent page refresh
    setToken('');
    localStorage.removeItem("odinBlogToken");
    setUser({});
    return;
}

function Root(){
    const [user, setUser] = useState({});
    const [token, setToken] = useState(getPreviousToken());
    const [error, setError] = useState('');
    //logic to check for user here
    const isLoggedIn = Object.keys(user).length > 0;
    const posts = [];
        return(
        <>
            <h1>Hi {user.username ?? "Stranger"}!</h1>
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
            <Outlet 
                context = {{ user, setUser, setToken, posts, error, setError }} 
            />
           
        </>
    )
}

export default Root;

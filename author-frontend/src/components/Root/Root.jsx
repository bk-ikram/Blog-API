import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavElement from "../NavElement/NavElement.jsx";

function Root(){
    const [user, setUser] = useState({});
    //logic to check for user here
    const isLoggedIn = Object.keys(user).length > 0;
    console.log(user);
    const posts = [];
        return(
        <>
            <h1>Hi there</h1>
            <nav>
                <ul>
                    <li><NavElement path="/">Home</NavElement></li>
                    { isLoggedIn && <li><NavElement path="create">Create Post</NavElement></li>} 
                    { !isLoggedIn &&<li><NavElement path="signin">Sign In</NavElement></li> }
                </ul>
            </nav>
            <Outlet 
                context = {{ user, setUser, posts }} 
            />
           
        </>
    )
}

export default Root;

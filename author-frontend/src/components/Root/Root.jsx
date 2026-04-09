import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import NavElement from "../NavElement/NavElement.jsx";

function Root(user){
    //logic to check for user here
    const isLoggedIn = Object.keys(user).length === 0;
    console.log("foud my root");
    const posts = [];
        return(
        <>
            <h1>Hi there</h1>
            <nav>
                <ul>
                    <li><NavElement path="/">Home</NavElement></li>
                    { isLoggedIn && <li><NavElement path="create">Create Post</NavElement></li>} 
                    { !isLoggedIn &&<li><NavElement path="signin">Sign In</NavElement></li> }
                    { !isLoggedIn &&<li><NavElement path="signup">Sign Up</NavElement></li> }
                </ul>
            </nav>
            <Outlet 
                context = {{ user, posts }} 
            />
           
        </>
    )
}

export default Root;

import { useState, useEffect } from "react";
import NavBar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import createApiFetch from "../../utils/apiFetch";

function getPreviousToken() {
  return localStorage.getItem("odinBlogToken");
}

function getPreviousUser() {
    const storedData= localStorage.getItem("odinBlogUser");
    if(!storedData)
        return {};
    return JSON.parse(storedData);
}



function Root(){
    const [user, setUser] = useState(getPreviousUser);
    const [token, setToken] = useState(getPreviousToken);
    const [error, setError] = useState('');
    //logic to check for user here
    const isLoggedIn = Object.keys(user).length > 0;

    const clearLoggedInUser = () => {
        setUser({});
        setToken('');
        localStorage.removeItem("odinBlogToken");
        localStorage.removeItem("odinBlogUser");
    }

    function handleLogOut(e){
        e.preventDefault(); //prevent page refresh
        clearLoggedInUser();
        return;
    }

    const apiFetch = createApiFetch({ token, onExpired: clearLoggedInUser });
    const posts = [];
        return(
        <>
            <h1>Hi {user.username ?? "Stranger"}!</h1>
            <NavBar 
            handleLogOut = {handleLogOut}
            isLoggedIn = {isLoggedIn}
            />
            <Outlet 
                context = {{ user, setUser, setToken, posts, error, setError, apiFetch }} 
            />
           
        </>
    )
}

export default Root;

import { postLogin } from '../../api/requests';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from "react"; 



async function handleLogIn(e, setUser, setToken, setError){
    e.preventDefault(); //prevent page refresh
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    try{
        const response = await postLogin(formJson);
        const { token, user } = ( response || {});
        if(token){
            setToken(token);
            localStorage.setItem("odinBlogToken", token);
            localStorage.setItem("odinBlogUser",JSON.stringify(user));
            setUser(user);
        }
    }
    catch(err){
        console.log("The error is ",err);
        setError(err.message);
    }
    
    return;
}

export default function SignIn(){
    const { user, setUser, setToken, error, setError } = useOutletContext();
    const isLoggedIn = Object.keys(user).length > 0;

    useEffect(() => {
        if(isLoggedIn) setError(undefined);
    }, [isLoggedIn]);

    return (
        <>
            {isLoggedIn && 
                <p>Welcome back {user.username}! You can now go to Home to view Posts</p>
            }
            {error && <h3>{error}</h3> }
            <form onSubmit={(e) => handleLogIn(e,setUser, setToken, setError)}>
                <p>
                    <label htmlFor="username">Username:  </label>
                    <input name="username" id="username" type="text" />
                </p>
                <p>
                    <label htmlFor="password">Password:  </label>
                    <input name="password" id="password" type="password" />
                </p>
                <button type="submit">Log In</button>
            </form>
        </>
    ) ;
}
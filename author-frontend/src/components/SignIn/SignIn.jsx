import { postLogin } from '../../api/requests';
import { useOutletContext } from 'react-router-dom';

async function handleLogIn(e, setUser){
    e.preventDefault(); //prevent page refresh
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const user = await postLogin(formJson);
    setUser(user);
    return;
}

export default function SignIn(){
    const { user, setUser } = useOutletContext();
    const isLoggedIn = Object.keys(user).length > 0;
    return (
        <>
            {isLoggedIn && 
                <p>Welcome back {user.userName}! You can now go to Home to view Posts</p>
            }
            <form onSubmit={(e) => handleLogIn(e,setUser)}>
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
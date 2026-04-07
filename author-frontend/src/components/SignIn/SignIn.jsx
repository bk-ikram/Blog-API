export default function SignIn(){

    return (
        <form action="/api/signin" method="post">
            <p>
                <label htmlFor="username"></label>
                <input name="username" id="username" type="text" />
                <label htmlFor="password"></label>
                <input name="password" id="password" type="password" /
            ></p>
        </form>
    ) ;
}
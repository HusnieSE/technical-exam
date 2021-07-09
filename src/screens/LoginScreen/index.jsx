
const LoginScreen = () => {
    return <div className="main-container">
        <div className="login-container">
            <form action="/dashboard">
                <h1> Login </h1>
                <hr />
                <input type="email" placeholder="Email Address" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit"> Log in </button>
            </form>
        </div>
    </div>
}

export default LoginScreen
import "@/styles/components/AuthForm.scss";

type AuthType = {
    type: "login" | "signup";
}

const AuthForm = ({type}: AuthType) => {
    const isLogin: boolean = type === "login";

    return (
        <div id="AuthForm">
            <div className="container">
                <div className="box">
                    <div className="left">
                        <h2>Welcome !</h2>
                        <form action="">
                            {!isLogin && (
                                <>
                                    <div className="textfield">
                                        <label htmlFor="first-name">First Name</label>
                                        <input type="text" name="first-name" id="first-name"
                                               placeholder="My First Name"/>
                                    </div>

                                    <div className="textfield">
                                        <label htmlFor="last-name">Last Name</label>
                                        <input type="text" name="last-name" id="last-name" placeholder="My Last Name"/>
                                    </div>
                                    <div className="textfield">
                                        <label htmlFor="age">Age</label>
                                        <input type="text" name="age" id="age" placeholder="My Age"/>
                                    </div>
                                </>
                            )}
                            <div className="textfield">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" placeholder="My Username"/>
                            </div>
                            <div className="textfield">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="My Password"/>
                            </div>

                            {!isLogin && (
                                <div className="textfield">
                                    <label htmlFor="c-password"> Confirm Password</label>
                                    <input type="password" name="c-password" id="c-password" placeholder="My Password confirmation"/>
                                </div>
                            )}
                            <input type="submit" className="cta" value={isLogin ? "Sign Up" : "Login"}/>
                        </form>
                    </div>
                    <div className="right">
                        <div className="bg-image"></div>
                        <h2>{isLogin ? "Are you new?" : "Already have an account?"}</h2>

                        <a href={isLogin ? "/signup" : "/login"}
                           className="cta"> {isLogin ? "Login" : "Sign Up"}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
import "@/styles/components/AuthForm.scss";
import {USER_API_URL} from "../constants.ts";

type AuthType = {
    type: "login" | "signup";
}

const AuthForm : React.FC<AuthType> = ({type}: AuthType) => {
    const isLogin: boolean = type === "login";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const userData = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            age: formData.get("age") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        };

        try {
            const response = await fetch(USER_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert("User saved successfully!");
            } else {
                alert("Failed to save User.");
            }
        } catch (error) {
            console.error("Error while saving the User:", error);
            alert("An unexpected error occurred.");
        }
    };


    return (
        <div id="AuthForm">
            <div className="container">
                <div className="box">
                    <div className="left">
                        <h2>Welcome !</h2>
                        <form onSubmit={handleSubmit}>
                            {!isLogin && (
                                <>
                                    <div className="textfield">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" name="firstName" id="firstName"
                                               placeholder="My First Name" required/>
                                    </div>

                                    <div className="textfield">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" name="lastName" id="lastName" placeholder="My Last Name" required/>
                                    </div>
                                    <div className="textfield">
                                        <label htmlFor="age">Age</label>
                                        <input type="number" name="age" id="age" placeholder="My Age" min="1" required/>
                                    </div>
                                </>
                            )}
                            <div className="textfield">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" placeholder="My Username" required/>
                            </div>
                            <div className="textfield">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="My Password" required/>
                            </div>

                            {!isLogin && (
                                <div className="textfield">
                                    <label htmlFor="c-password"> Confirm Password</label>
                                    <input type="password" name="c-password" id="c-password" placeholder="My Password confirmation" required/>
                                </div>
                            )}
                            <input type="submit" className="cta" value={isLogin ? "Login" : "Sign Up"}/>
                        </form>
                    </div>
                    <div className="right">
                        <div className="bg-image"></div>
                        <h2>{isLogin ? "Are you new?" : "Already have an account?"}</h2>
                        <a href={isLogin ? "/signup" : "/login"}
                           className="cta"> {isLogin ? "Sign Up" : "Login"}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
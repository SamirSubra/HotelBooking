import {useEffect, useState} from 'react';
import {UserProps} from "../types/types.ts";
import popHotelImg from "@images/popular_hotel.jpg";
import starImg from "@icons/star.png";
import locationImg from "@icons/location.png";
import priceImg from "@icons/price.svg";
import {USER_API_URL} from "../constants.ts";
import "@/styles/pages/User.scss";
const User = () => {
    const[user, setProfile] = useState<UserProps>();
    const [error, setError] = useState<string | null>(null); // State for errors

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        // Fetch users from the backend
        fetch(`${USER_API_URL}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch the user");
                }
                return response.json();
            })
            .then((data: UserProps) => setProfile(data))
            .catch((err) => setError(err.message)); // Handle errors
    }, []);

    // Display error message if there's an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    if(!user){
        return(
            <div>No User data available</div>
        )
    }

    return (
        <main id="User">
            <section className="section_1">
                <div className="container">
                    <div className="left">
                        <img src={USER_API_URL + user.profilePhoto} alt="Profil image"/>
                        <div className="buttons">
                            <button className="btn green">Change image</button>
                            <button className="btn red">Delete image</button>
                        </div>

                    </div>
                    <form action="">
                        <h3>My information</h3>
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
                        <div className="textfield">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="My Username"/>
                        </div>
                        <div className="textfield">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="My Password"/>
                        </div>
                        <div className="textfield">
                            <label htmlFor="c-password"> Confirm Password</label>
                            <input type="password" name="c-password" id="c-password"
                                   placeholder="My Password confirmation"/>
                        </div>
                        <input type="submit" className="cta" value="Save"/>
                    </form>
                </div>
            </section>

            <section className="section_2">
                <div className="container">
                    <h2>My current booking</h2>

                    <div className="hotel">
                        <img src={popHotelImg} alt="hotel image"/>
                        <div className="right">
                            <div className="row sb">
                                <h3>Magimbi hotel</h3>
                                <p>26/08/2024 - 30/08/2024</p>
                            </div>
                            <div className="stars">
                                <img src={starImg} alt="Star" className="star icon"/>
                                <img src={starImg} alt="Star" className="star icon"/>
                                <img src={starImg} alt="Star" className="star icon"/>
                                <img src={starImg} alt="Star" className="star icon"/>
                            </div>
                            <div className="row">
                                <img src={locationImg} alt="location icon" className="icon"/>
                                <p>29 rue du bagougou 12300 Green Island</p>
                            </div>
                            <div className="row sb">
                                <div className="row">
                                    <img src={priceImg} alt="price icon" className="icon"/>
                                    <p>100$ / night</p>
                                </div>
                                <div className="buttons">
                                    <button className="btn green">modify</button>
                                    <button className="btn red">delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn red">Delete my account</button>
                </div>
            </section>
        </main>
    );
};

export default User;
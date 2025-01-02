import "@/styles/pages/Hotel.scss";
import fallbackImg from "@/assets/images/blank_bg.jpg";
import starImg from "@/assets/images/icons/star.png";
import locationImg from "@/assets/images/icons/location.png";
import bedImg from "@/assets/images/icons/bed.png";
import calendarImg from "@/assets/images/icons/calendar.png";
import priceImg from "@/assets/images/icons/price.svg";
import {HotelProps} from "../types/types.ts";
import {useEffect, useState} from "react";
import {HOTEL_API_URL} from "../constants.ts";

const Hotel : React.FC<HotelProps> = () => {
    const[hotel, setHotel] = useState<HotelProps>();
    const [error, setError] = useState<string | null>(null); // State for errors

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        // Fetch hotels from the backend
        fetch(`${HOTEL_API_URL}/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch the hotel");
                }
                return response.json();
            })
            .then((data: HotelProps) => setHotel(data))
            .catch((err) => setError(err.message)); // Handle errors
    }, []);

    // Display error message if there's an error
    if (error) {
        return <div>Error: {error}</div>;
    }

    if(!hotel){
        return(
            <div>No hotel data available</div>
        )
    }

    return (
        <main id={"Hotel"}>
            <section className="section_1">
                <div className="container">
                    <div className="images">
                        <div className="main-image">
                            <img src={`${HOTEL_API_URL}${hotel.images[0] ?? fallbackImg }`} alt="Main hotel image"/>
                        </div>
                        <div className="small-images">
                            {[...Array(3)].map((_, idx) => (
                                <img key={idx} src={hotel.images[idx+1] ? `${HOTEL_API_URL}${hotel.images[idx+1]}` :  fallbackImg} alt={`Hotel image ${idx+1}`}/>
                            ))}
                        </div>
                    </div>

                    <form action="">
                        <div className="input">
                            <img src={bedImg} alt="bed icon" className="icon"/>
                            <label htmlFor="">Room Types</label>
                            <select className="roomTypes" name="roomTypes" id="roomTypes">
                                {hotel.roomTypes.map((elt, idx) => (
                                        <option key={idx} value={elt}>{elt} Room</option>
                                ))}
                            </select>
                        </div>
                        <div className="input">
                            <img src={calendarImg} alt="calendar icon" className="icon"/>
                            <label htmlFor=""></label>
                            <input type="date" name="" id=""/>
                        </div>
                        <div className="input">
                            <img src={calendarImg} alt="calendar icon" className="icon"/>
                            <label htmlFor=""></label>
                            <input type="date" name="" id=""/>
                        </div>
                        <input type="submit" value="Book" className="cta"/>
                    </form>
                </div>
            </section>
            <section className="section_2">
                <div className="container">
                    <div className="row">
                        <h2>{hotel.name}</h2>
                        <div className="stars">
                            {[...Array(hotel.stars).map(() => (
                                <img src={starImg} alt="star" className="icon star"/>
                            ))]}
                        </div>
                    </div>
                    <div className="row">
                        <img src={locationImg} alt="location icon" className="icon"/>
                        <p>{hotel.location}</p>
                    </div>
                    <div className="row">
                        <img src={priceImg} alt="price icon" className="icon"/>
                        <p>{hotel.price}$ / night</p>
                    </div>

                </div>
            </section>
            <section className="section_3">
                <div className="container">
                    <div className="left">
                        <div className="box">
                            <h3>Description</h3>
                            <p>{hotel.description}</p>
                        </div>
                    </div>
                    <div className="box vertical">
                        <h3>To know</h3>
                        <ul>
                            <li>Keep noise levels low for other guests.</li>
                            <li>Avoid making noise in the hallways.</li>
                            <li>Use facilities responsibly.</li>
                            <li>Follow meal and breakfast schedules.</li>
                            <li>Adhere to the rules for common areas (pool, gym).</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Hotel;
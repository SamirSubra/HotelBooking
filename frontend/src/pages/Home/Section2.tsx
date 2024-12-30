import popHotelImg from "@/assets/images/popular_hotel.jpg";
import popHotelImg2 from "@/assets/images/costa_brava.jpeg";
import popHotelImg3 from "@/assets/images/hotel_image2.png";
import bedImg from "@/assets/images/icons/bed.png";
import calendarImg from "@/assets/images/icons/calendar.png";
import locationImg from "@/assets/images/icons/location.png";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HotelCard from "../../components/HotelCard.tsx";
import {HotelProps} from "../../types/types.ts";
import {HOTEL_API_URL} from "../../constants.ts";

const Section2 = () => {
    const hotelList = useRef<HTMLDivElement | null>(null);
    const dotNavigation = useRef<HTMLDivElement | null>(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [hotels, setHotels] = useState<HotelProps[]>([]); // State for hotels
    const [error, setError] = useState<string | null>(null); // State for errors

    const handleStartDate = (date: Date | null) => {
        if (date) {
            setStartDate(date);
        }
    };

    const handleEndDate = (date: Date | null) => {
        if (date) {
            setEndDate(date);
        }
    };

    useEffect(() => {
        // Fetch hotels from the backend
        fetch(HOTEL_API_URL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch hotels");
                }
                return response.json();
            })
            .then((data: HotelProps[]) => setHotels(data))
            .catch((err) => setError(err.message)); // Handle errors
    }, []);

    useEffect(() => {
        // Dynamic dots navigation logic remains unchanged
        function scroll(event: Event, newIndex: number) {
            const dot: HTMLElement = event.currentTarget as HTMLDivElement;
            let scrollAmount: number = 0;
            let currentIndex: number = 0;
            if (hotelList.current && dotNavigation.current) {
                const dots: NodeListOf<Element> = dotNavigation.current.querySelectorAll(".dot");

                for (let i = 0; i < dots.length; i++) {
                    if (dots[i].classList.contains("active")) {
                        currentIndex = i;
                        dots[i].classList.remove("active");
                    }
                }
                dot.classList.add("active");

                const randomHotel: Element | null = hotelList.current.querySelectorAll(".hotel")[1];
                if (randomHotel) {
                    const hotelWidth = getComputedStyle(randomHotel).width;

                    if (newIndex > currentIndex) {
                        scrollAmount = (newIndex - currentIndex) * parseInt(hotelWidth);
                    } else if (newIndex < currentIndex) {
                        scrollAmount = (newIndex - currentIndex) * parseInt(hotelWidth);
                    }
                    hotelList.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }

        if (dotNavigation.current && hotelList.current) {
            dotNavigation.current.innerHTML = "";
            const hotels: NodeListOf<Element> = hotelList.current.querySelectorAll(".hotel");
            for (let i: number = 0; i < hotels.length; i++) {
                const dot: HTMLElement = document.createElement("span");
                dot.className = "dot";

                if (i === 0) {
                    dot.classList.add("active");
                }
                dot.addEventListener("click", (event) => {
                    scroll(event, i);
                });
                if (dotNavigation) {
                    dotNavigation.current.appendChild(dot);
                }
            }
        }
    }, [hotels]); // Re-run dots logic when hotels change

    return (
        <section className="section_2">
            <div className="container">
                <div className="left">
                    <h2>Popular search</h2>
                    <ul className="popular-list">
                        <li className="popular-list__item">
                            <a href="/hotel">
                                <img src={popHotelImg} alt="popular hotel" />
                            </a>
                        </li>
                        <li className="popular-list__item">
                            <a href="/hotel">
                                <img src={popHotelImg2} alt="popular hotel" />
                            </a>
                        </li>
                        <li className="popular-list__item">
                            <a href="/hotel">
                                <img src={popHotelImg3} alt="popular hotel" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <form action="">
                        <div className="fields">
                            <div className="input">
                                <img src={locationImg} alt="location icon" className="icon" />
                                <label htmlFor=""></label>
                                <select name="" id="">
                                    <option value="">Lyon</option>
                                    <option value="">Paris</option>
                                    <option value="">Marseille</option>
                                </select>
                            </div>
                            <div className="input">
                                <img src={bedImg} alt="bed icon" className="icon" />
                                <label htmlFor=""></label>
                                <select name="" id="">
                                    <option value="">Single Room</option>
                                    <option value="">Double Room</option>
                                    <option value="">Twin Room</option>
                                    <option value="">Triple Room</option>
                                    <option value="">Quad Room</option>
                                </select>
                            </div>
                            <div className="input">
                                <img src={calendarImg} alt="calendar icon" className="icon" />
                                <DatePicker selected={startDate} onChange={handleStartDate} />
                            </div>
                            <div className="input">
                                <img src={calendarImg} alt="calendar icon" className="icon" />
                                <DatePicker selected={endDate} onChange={handleEndDate} />
                            </div>
                        </div>
                        <input type="submit" value="Search" className="cta" />
                    </form>
                    <h2>Results</h2>
                    <div className="carousel">
                        <div ref={hotelList} className="hotel-list">
                            {error && <p>{error}</p>}
                            {hotels.map((hotel) => (
                                <HotelCard
                                    key={hotel._id}
                                    _id={hotel._id}
                                    name={hotel.name}
                                    location={hotel.location}
                                    stars={hotel.stars}
                                    images={hotel.images}
                                />
                            ))}
                        </div>
                        <div ref={dotNavigation} className="dots-navigation"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section2;

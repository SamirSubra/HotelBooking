import {useEffect, useRef, useState} from "react";
import {HotelProps} from "../../types/types.ts";
import HotelAdminCard from "../../components/HotelAdminCard.tsx";
import {HOTEL_API_URL} from "../../constants.ts";

const AdminHotels = () => {
    const hotelList = useRef<HTMLDivElement | null>(null);
    const dotNavigation = useRef<HTMLDivElement | null>(null);
    const [hotels, setHotels] = useState<HotelProps[]>([]); // State for hotels
    const [error, setError] = useState<string | null>(null); // State for errors

    const handleDeleteHotel = (id: string) => {
        setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== id));
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
        <div className="admin-hotels container">
            <h1>Current bookings</h1>
            <div className="carousel">
                <div ref={hotelList} className="hotel-list">
                    {error && <p>{error}</p>}
                    {hotels.map((hotel) => (
                        <HotelAdminCard
                            key={hotel._id}
                            {...hotel}
                            onDelete={handleDeleteHotel}
                        />
                    ))}
                </div>
                <div ref={dotNavigation} className="dots-navigation"></div>
            </div>
        </div>
    );
};

export default AdminHotels;
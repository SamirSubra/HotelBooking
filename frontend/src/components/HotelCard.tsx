import starImg from "@/assets/images/icons/star.png";
import locationImg from "@/assets/images/icons/location.png";
import {HotelProps} from "../types/types";
import {HOTEL_API_URL} from "../constants.ts";


const HotelCard: React.FC<HotelProps> = ({ _id, name, location, stars, images }) => {
    const validatedStars = Math.min(Math.max(stars, 0), 5); // Ensure stars are within a valid range (0-5)
    return (
        <div className="hotel">
            <img src={HOTEL_API_URL + images[0]} alt={`${name} hotel image`} />
            <div className="bottom">
                <p className="hotel__name">{name}</p>
                <span className="row">
                    <div className="hotel__stars" aria-label={`${validatedStars} out of 5 stars`}>
                        {Array.from({ length: validatedStars }).map((_, i) => (
                            <img key={i} src={starImg} alt="star" />
                        ))}
                    </div>
                    <div className="hotel__location">
                        <img src={locationImg} alt="location icon" />
                        <p>{location}</p>
                    </div>
                </span>
                <a href={`/hotel?id=${_id}`} target="_blank" className="cta">
                    Interested
                </a>
            </div>
        </div>
    );
};

export default HotelCard;

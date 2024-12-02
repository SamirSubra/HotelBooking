
import starImg from "@/assets/images/icons/star.png";
import locationImg from "@/assets/images/icons/location.png";

interface HotelProps{
    name: string,
    location: string,
    stars: number,
    imageSrc: string
}

const HotelCard : React.FC<HotelProps> = ({name, location, stars, imageSrc}) => {
    return (
        <div className="hotel">
            <img src={imageSrc} alt="hotel result"/>
            <div className="bottom">
                <p className="hotel__name">{name}</p>
                <span className="row">
                <div className="hotel__stars">
                    {
                        [...Array(stars)].map((_,i) => (
                            <img key={i} src={starImg} alt="star"/>
                        ))
                    }
                </div>
                <div className="hotel__location">
                    <img src={locationImg} alt="location"/>
                    <p>{location}</p>
                </div>
            </span>
                <a href="/frontend/src/components/HotelCard" className="cta">Interested</a>
            </div>
        </div>
    );
};

export default HotelCard;
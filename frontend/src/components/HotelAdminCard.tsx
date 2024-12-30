import starImg from "@icons/star.png";
import locationImg from "@icons/location.png";
import priceImg from "@icons/price.svg";
import {HotelProps} from "../types/types.ts";
import "@/styles/components/_hotelAdminCard.scss";
import {HOTEL_API_URL} from "../constants.ts";

interface HotelAdminCardProps extends HotelProps {
    onDelete: (id: string) => void; // Add onDelete
}

const HotelAdminCard : React.FC<HotelAdminCardProps> = ({_id, name, location, price,  stars, images, onDelete}) => {
    const handleDelete = async (id: string) => {
        if (!id) {
            console.error("No ID provided for deletion.");
            return;
        }

        try {
            const response = await fetch(`${HOTEL_API_URL}/${id}`, { method: "DELETE" });
            if (response.ok) {
                console.log("Hotel deleted successfully");
                onDelete(id); // Report deletion to parent
            } else {
                console.error("Failed to delete hotel");
            }
        } catch (error) {
            console.error("Error during deletion:", error);
        }
    };


    return (
        <div className="hotel-admin-card">
            <img src={`${HOTEL_API_URL}${images[0]}`} alt="hotel image"/>
            <div className="right">
                <div className="row sb">
                    <h3>{name}</h3>
                    <p>26/08/2024 - 30/08/2024</p>
                </div>
                <div className="stars">
                    {[...Array(stars)].map((_, index) => (
                        <img key={index} src={starImg} alt="Star" className="star icon"/>
                    ))}
                </div>
                <div className="row">
                    <img src={locationImg} alt="location icon" className="icon"/>
                    <p>{location}</p>
                </div>
                <div className="row sb">
                    <div className="row">
                        <img src={priceImg} alt="price icon" className="icon"/>
                        <p>{price} / night</p>
                    </div>
                    <div className="double-buttons">
                        <a href={"/admin/modify-hotel?id=" + _id} className="btn green">modify</a>
                        <button type="submit" onClick={() => handleDelete(_id ?? "")} className="btn red">delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelAdminCard;
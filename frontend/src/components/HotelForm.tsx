import {useEffect, useRef, useState} from 'react';
import blankImg from "@/assets/images/blank_bg.jpg";
import {HotelProps} from "../types/types.ts";
import {HOTEL_API_URL} from "../constants.ts";

interface HotelFormData {
    id?: string | null;
}

const HotelForm : React.FC<HotelFormData> = ({id}) => {
    // Arrays of refs for images and inputs
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [alertShown, setAlertShown] = useState(false); // State to control alert display
    const [hotel, setHotel] = useState<HotelProps>();

    // Handler to update the correct image preview
    const handleFileChange = (index: number) => {
        const img = imageRefs.current[index];
        const input = inputRefs.current[index];

        if (img && input && input.files?.[0]) {
            const file = input.files[0];
            const fileURL = URL.createObjectURL(file);

            // Update the corresponding image
            img.src = fileURL;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch(id ? `${HOTEL_API_URL}/${id}` : HOTEL_API_URL, {
                method: id ? "PUT" : "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Hotel saved successfully!");
                // Redirige ou mets à jour l'interface
            } else {
                alert("Failed to save hotel.");
            }
        } catch (error) {
            console.error("Error while saving the hotel:", error);
            alert("An unexpected error occurred.");
        }
    };

    useEffect(() => {
        if(id){
            fetch(`${HOTEL_API_URL}/${id}`)
                .then((response) =>{
                    if(!response.ok){
                        console.log("Failed to fetch the hotel");
                    }
                    return response.json();
                })
                .then((data: HotelProps) => setHotel(data))
                .catch((err) => console.log(err.message)); // Handle errors
        }
    }, [id]);
    // Display success or error message on page load
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const successMessage = urlParams.get("success");
        const errorMessage = urlParams.get("error");

        // Check if an alert has already been shown to avoid multiple alerts
        if (!alertShown) {
            if (successMessage) {
                alert("Request sent successfully!");
                setAlertShown(true); // Mark alert as shown
            }

            if (errorMessage) {
                if (errorMessage == "1") {
                    alert("An error occurred while sending the request.");
                    setAlertShown(true); // Mark alert as shown
                } else if (errorMessage == "2") {
                    alert("Invalid data");
                    setAlertShown(true); // Mark alert as shown
                }
            }
        }
    }, [alertShown]); // Depend on alertShown state to prevent multiple alerts

    return (
        <div className="container admin-create-hotel">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h1>{!id ? "Create new hotel" : "Modify hotel"}</h1>
                <div className="content">
                    <div className="left">
                        <div className="input">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" defaultValue={hotel?.name ?? ""} placeholder="Name"
                                   required/>
                        </div>
                        <div className="input">
                            <label htmlFor="name">Description</label>
                            <input type="text" name="description" id="description"
                                   defaultValue={hotel?.description ?? ""} placeholder="Description (optional)"/>
                        </div>
                        <div className="input">
                            <label htmlFor="location">Location</label>
                            <input type="text" name="location" id="location" defaultValue={hotel?.location ?? ""}
                                   placeholder="Location"/>
                        </div>
                        <div className="input">
                            <label htmlFor="name">Equipments</label>
                            <input type="text" name="equipments" id="equipments" defaultValue={hotel?.equipments ?? ""}
                                   placeholder="Equipments (optional)"/>
                        </div>
                        <div className="input">
                            <label htmlFor="location">Price / night</label>
                            <input type="number" name="price" id="price" defaultValue={hotel?.price ?? ""}
                                   placeholder="Price / night" required/>
                        </div>
                        <div className="input">
                            <label htmlFor="stars">Stars</label>
                            <input type="number" name="stars" id="stars" defaultValue={hotel?.stars ?? ""}
                                   placeholder="Stars" required/>
                        </div>
                    </div>
                    <div className="right">
                        {[0, 1, 2, 3].map((index) => (
                            <div className="photo" key={index}>
                                <img
                                    ref={(el) => (imageRefs.current[index] = el)}
                                    src={hotel?.images[index] ? HOTEL_API_URL + hotel.images[index] : blankImg}
                                    alt={`image ${index + 1}`}
                                />
                                <label htmlFor={`image${index + 1}`}>Image {index + 1}</label>
                                <input
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="file"
                                    name="images"
                                    id={`image${index + 1}`}
                                    accept="image/*"
                                    onChange={() => handleFileChange(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <input type="submit" value={!id ? "Create" : "Modify"} className="cta"/>
            </form>
        </div>
    );
};

export default HotelForm;
import HotelForm from "../../components/HotelForm.tsx";

const AdminModifyHotel = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id : string | null = urlParams.get("id");
    return (
        <HotelForm id={id}/>
    );
};

export default AdminModifyHotel;
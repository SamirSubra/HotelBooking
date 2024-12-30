import "@/styles/pages/admin.scss";
import {Outlet} from "react-router-dom";

const Admin = () => {
    return (
        <main id="admin">
            <div className="admin-side-menu">
                <a className="logo" href="/">HotelB</a>
                <ul className="menu">
                    <li className="menu-item"><a href="/admin/create-hotel">Create hotel</a></li>
                    <li className="menu-item"><a href="/admin/hotels">Current bookings</a></li>
                    <li className="menu-item"><a href="/admin/users">Users</a></li>
                </ul>
            </div>
            <div className="right">
                <Outlet/>
            </div>
        </main>
    );
};

export default Admin;
import "@/styles/layouts/Header.scss";
import {useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <header id="header" className={isHomePage ? "header-home" : ""}>
            <div className="container">
                <nav className="navigation">
                    <a href="/" className="navigation__logo logo">HotelB</a>
                    <a href="/login" className="navigation__login">Login / Sign Up</a>
                </nav>
            </div>
        </header>
);
};

export default Header;
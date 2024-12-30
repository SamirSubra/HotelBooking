import "@/styles/pages/Hotel.scss";
import mainImg from "@/assets/images/hotel_image.png";
import smallImg from "@/assets/images/hotel_image2.png";
import starImg from "@/assets/images/icons/star.png";
import locationImg from "@/assets/images/icons/location.png";
import bedImg from "@/assets/images/icons/bed.png";
import calendarImg from "@/assets/images/icons/calendar.png";
import personImg from "@/assets/images/icons/person.png";
import priceImg from "@/assets/images/icons/price.svg";
import {HotelProps} from "../types/types.ts";

// const Hotel : React.FC<HotelProps> = (}) => {
const Hotel : React.FC<HotelProps> = () => {
    return (
        <main id={"Hotel"}>
            <section className="section_1">
                <div className="container">
                    <div className="images">
                        <div className="main-image">
                            <img src={mainImg} alt="Main hotel image"/>
                        </div>
                        <div className="small-images">
                            <img src={smallImg} alt="Other hotel image"/>
                            <img src={smallImg} alt="Other hotel image"/>
                            <img src={smallImg} alt="Other hotel image"/>
                        </div>
                    </div>

                    <form action="">
                        <div className="input">
                            <img src={personImg} alt="person icon" className="icon"/>
                            <label htmlFor=""></label>
                            <select name="" id="">
                                <option value="">2 people</option>
                                <option value="">3 people</option>
                                <option value="">3 people</option>
                            </select>
                        </div>
                        <div className="input">
                            <img src={bedImg} alt="bed icon" className="icon"/>
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
                        <h2>Magimbi Hotel</h2>
                        <div className="stars">
                            <img src={starImg} alt="star" className="icon star"/>
                            <img src={starImg} alt="star" className="icon star"/>
                            <img src={starImg} alt="star" className="icon star"/>
                            <img src={starImg} alt="star" className="icon star"/>
                        </div>
                    </div>
                    <div className="row">
                        <img src={locationImg} alt="location icon" className="icon"/>
                        <p>29 rue du bagougou 12300 Green Island</p>
                    </div>
                    <div className="row">
                        <img src={priceImg} alt="price icon" className="icon"/>
                        <p>100$ / night</p>
                    </div>

                </div>
            </section>
            <section className="section_3">
                <div className="container">
                    <div className="left">
                        <div className="box">
                            <h3>Description</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis non erat quis
                                varius. Pellentesque libero arcu, tincidunt vel ex non, sodales auctor metus.</p>
                        </div>
                        <div className="box">
                            <h3>Equipement</h3>
                            <ul>
                                <li>Park</li>
                                <li>Wifi</li>
                                <li>Lorem</li>
                                <li>Lorem</li>
                            </ul>
                        </div>
                    </div>
                    <div className="box vertical">
                        <h3>To know</h3>
                        <ul>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Hotel;
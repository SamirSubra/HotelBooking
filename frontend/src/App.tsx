import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home.tsx";
import Error from './pages/Error.tsx';
import Header from "./layouts/Header.tsx";
import Footer from "./layouts/Footer.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Hotel from "./pages/Hotel.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import "@/styles/index.scss";
import AdminUsers from "./pages/Admin/AdminUsers.tsx";
import AdminHotels from "./pages/Admin/AdminHotels.tsx";
import AdminCreateHotel from "./pages/Admin/AdminCreateHotel.tsx";
import AdminModifyHotel from "./pages/Admin/AdminModifyHotel.tsx";
import User from "./pages/User.tsx";

function App() {
  return (
      <BrowserRouter>
        <div id="app">
            <Header/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/*" element={<Error/>}/>
              <Route path="/hotel" element={<Hotel/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/user" element={<User/>}/>
              <Route path="/admin" element={<Admin/>}>
                  <Route path="users" element={<AdminUsers/>}/>
                  <Route path="hotels" element={<AdminHotels/>}/>
                  <Route path="create-hotel" element={<AdminCreateHotel/>}/>
                  <Route path="modify-hotel" element={<AdminModifyHotel/>}/>
              </Route>

          </Routes>
            <Footer/>
        </div>
      </BrowserRouter>
  );
}

export default App

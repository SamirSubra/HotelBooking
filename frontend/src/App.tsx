import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home.tsx";
import Error from './pages/Error.tsx';
import Header from "./layouts/Header.tsx";
import Footer from "./layouts/Footer.tsx";
import "@/styles/index.scss";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Hotel from "./pages/Hotel.tsx";
import Profil from "./pages/Profil.tsx";

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
              <Route path="/profil" element={<Profil/>}/>
          </Routes>
            <Footer/>
        </div>
      </BrowserRouter>
  );
}

export default App

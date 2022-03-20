import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { Switch } from "react-router";
//importamos los componentes creados
import Home from "../pages/Home"
import LoginForm from "../components/accountBox/LoginForm"
import SignupForm from "../components/accountBox/SignupForm"
import Navbar from "../components/Layouts/Navbar";
import PageForm from "../pages/PageForm"



export default function AppRouter() {
    return (
        <>



            {/*  <Switch>

                    <Route path="/" element={<Home />} />
                    <Route path="/Registrate" element={<SignupForm />} />
                    <Route path="/IniciaSesion" element={<LoginForm />} />

                </Switch>*/}

            <BrowserRouter>

                <Navbar />
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/IniciaSesion" element={<LoginForm />} />
                        <Route path="/Registrate" element={<SignupForm />} />
                    </Routes>

                </div>

            </BrowserRouter>




        </>
    )
}




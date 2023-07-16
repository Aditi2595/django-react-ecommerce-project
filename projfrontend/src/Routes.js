import { BrowserRouter, Route, Routes} from "react-router-dom"
import PrivateRoutes from "./auth/helper/PrivateRoute";
import Cart from "./core/Cart";
import Home from "./core/Home"
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import UserDashboard from "./user/UserDashboard";

const Routing = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/signup" element={<SignUp/>} />
                <Route exact path="/signin" element={<SignIn/>} />
                <Route exact path="/cart" element={<Cart/>} />
                <Route exact element={<PrivateRoutes/>}>
                    <Route exact path="user/dashboard" element={<UserDashboard/>}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;


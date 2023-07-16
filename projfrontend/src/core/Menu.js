import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";




const Menu = ({path}) => {
    const location = useLocation() //to identigy the current object URL
    const navigate = useNavigate();
    const currentTab = (path) => {
        if(location.pathname === path){
            return {color: "#2ecc72"}
        } else {
            return {color: "#FFFFFF"}
        }

    }
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab("/")} to="/">Home</Link>
                </li>

                {isAuthenticated() && (<li className="nav-item">
                    <Link className="nav-link" style={currentTab("/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                </li>)}

                {!isAuthenticated() && (
                    <>
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab("/signin")} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={currentTab("/signup")} to="/signup">Sign Up</Link>
                    </li>
                    </>
                )}
                
                <li className="nav-item">
                    <Link className="nav-link" style={currentTab("/cart")} to="/cart">Cart</Link>
                </li>
                
                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className="nav-link text-warning" onClick={() => {
                        signout(()=>{
                            navigate("/")
                        })
                    }}>Sign Out</span>
                </li>
                )}
                
                
            </ul>
        </div>
    )
}
export default Menu;
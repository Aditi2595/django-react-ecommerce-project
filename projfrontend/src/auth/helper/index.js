import {API} from "../../backend"
import {emptyCart} from "../../core/helper/CartHelper";

//convert below function using async await later
export const signUp = (user) => {
    return fetch(`${API}user/`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => console.log(err))
}

export const signin = (user) => {
    const formData = new FormData();
    for (const name in user) {
        formData.append(name, user[name])
    }

    // below code is explanation of above lines 
    // const {email, password} = user;
    // const formData = new FormData();
    // formData.append("email", email)
    // formData.append("password", password)

    return fetch(`${API}user/login/`, {
        method: "POST",
        body: formData,
    })
    .then((response) =>{
        console.log("SUCCESS", response)
        return response.json()
    })
    .catch((err) => console.log(err))

}

export const authenticate = (data, next) => {
    if(typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const isAuthenticated = () => {
    if(typeof window == undefined) {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
}

export const signout = next => {

    const userID = isAuthenticated() && isAuthenticated().user.id
    if(typeof window !== undefined){
        localStorage.removeItem("jwt");
        emptyCart(() => {})
       // next();
        return fetch(`${API}user/logout/${userID}`,{
            method: "GET",
        })
        .then((response => {
            console.log("Logout Success")
            next();
        }))
        .catch((err) => console.log(err))
    }

}
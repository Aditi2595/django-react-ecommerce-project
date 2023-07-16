
//adding cart items to localstorage
export const addItemToCart = (item, next) => {
    let cart = [];
    // eslint-disable-next-line
    if(typeof window !== undefined) {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.push({
            ...item,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};

// loading Cart items
export const loadCart = () => {
    // eslint-disable-next-line
    if (typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
}

//removing cart items and updating the updated cart
export const removeItemFromCart = (productID) => {
    let cart = [];
    if(typeof window !== undefined) {
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product, i) => {
            if(product.id === productID){
                cart.splice(i,1);
            }
        });
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;

}

//emptying the cart
export const emptyCart = next => {
    if (typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}
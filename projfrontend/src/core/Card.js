import React, { useState } from "react";
import ImageHelper from "./helper/imagehelper";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import { isAuthenticated } from "../auth/helper";


//const isAuthenticated = true

const Card = ({
    product,
    addtoCart = true,
    removefromCart = true,
    reload = undefined,
    // function(f) {return f}
    setReload = (f) => f,
}) => {
    const cartTitle = product ? product.name : "Default product title"
    const cartDescription = product ? product.description : "Default product description"
    const cartPrice = product ? product.price : "Default product price"

    const [redirect, setRedirect] = useState(false)
    const addToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product, ()=> setRedirect(true))
            console.log("Added to Cart")
        } else {
            console.log("Login Please")
        }
    }

    const getARedirect = redirect => {
        if(redirect) {
            return <Navigate to="/cart" />
        }
    }

    const showsAddToCart = addToCart => {
        return addtoCart && (<button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>

        )
    }

    const ShowRemoveFromCart = removeFromCart => {
        return removeFromCart && (
            <button
                onClick={() => {
                    console.log("product removed from cart")
                    removeItemFromCart(product.id)
                    setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
        )
    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
              {showsAddToCart(addToCart)}
            </div>
            <div className="col-12">
                {ShowRemoveFromCart(removefromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };
export default Card;
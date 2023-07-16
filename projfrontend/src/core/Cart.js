import React, { useEffect, useState } from "react";
import Base from "./Base";
import { loadCart } from "./helper/CartHelper";
import Card from "./Card";
import PaymentB from "./PaymentB";

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                {products.map((product, index) => (
                        <Card key={index}
                        product={product}
                        removeFromCart={true}
                        addtoCart={false}
                        reload={reload}
                        setReload={setReload}/>
                    ))}     
            </div>
        )
    }
    

    const loadCheckout = () => {
        return (
            <div>
                <h1>Checkout</h1>
            </div>
        )
    }
    return(
        <Base title="This is Cart page">
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 ? (loadAllProducts(products)) : (
                        <h4>No products</h4>
                    )}
                </div>
                <div className="col-6">
                    {products.length > 0 ? (
                        <PaymentB products={products} setReload={setReload}/>
                    ) : (
                        <h3>Please login or add something to cart</h3>
                    )}
                </div>

            </div>
        </Base>
    ) 

}


export default Cart;
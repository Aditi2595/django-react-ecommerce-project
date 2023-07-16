import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { emptyCart } from "./helper/CartHelper";
import { getmeToken, processPayment } from "./helper/PaymentHelper";
import { createOrder } from "./helper/OrderHelper";
import { isAuthenticated, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({
    products,
    reload = undefined,
    setReload = f => f
}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "something went wrong",
        instance: {}

    });
    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getToken = (userId, token) => {
        getmeToken(userId, token)
        .then((info) => {
            if(info.error){
                setInfo({
                    ...info,
                    error: info.error,
                });
                signout(() => {
                    return <Navigate to="/" />
                })
            } else {
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getAmount = () => {
        let amount = 0;
        products.map((p) => {
            amount = amount + parseInt(p.price)
        })
        return amount;
    }

    //function when clicking on Pay now button
    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        console.log(info.instance)
        let getNonce = info.instance?.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce;
            console.log(nonce)
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then((response) => {
                console.log("P-1", response);
                if(response.error) {
                    if(response.code === '1') {
                        console.log("PAYMENT FAILED")
                        signout(() => {
                            return <Navigate to="/" />
                        })
                    }
                } else {
                    setInfo({
                        ...info, success: response.success, loading: false
                    })
                    console.log("PAYMENT SUCCESSFUL")
                    let product_names = ""
                    products.forEach(function(item){
                        product_names += item.name + ", "
                    });

                    const orderData = {
                        products: product_names,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount
                    }

                    console.log(orderData)

                    createOrder(userId, token, orderData)
                    .then((response) => {
                        console.log("P-2", response)
                        if(response.error) {
                            if(response.code === "1"){
                                console.log("ORDER FAILED")
                            }
                            signout(() => {
                                return <Navigate to="/" />
                            })
                        } else {
                            if (response.success === true){
                                console.log("ORDER PLACED")
                            }
                        }
                    })
                    .catch((error) => {
                        setInfo({loading: false, success: false})
                        console.log("ORDER FAILED", error)
                    })
                    emptyCart(() => {
                        console.log("CART IS EMPTIED OUT")
                    })

                    setReload(!reload)
                        
                }
            })
            .catch(e => console.log(e))
        })
        .catch((e) => console.log("NONCE", e))

    }

    const showbtnDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? 
                    (
                        <div>
                            <DropIn options={{authorization: info.clientToken}}
                            onInstance={instance => info.instance = instance}>
                            </DropIn>
                            <button onClick={onPurchase} className="btn btn-block btn-success">Pay Now</button>
                            
                        </div>
                    ) :
                    (
                        <h3>Please login first or add something to cart</h3>
                    )
                }
            </div>
        )
    }
    return (
        <div>
            <h3>Your bill is $ {getAmount()}</h3>
            {showbtnDropIn()}
        </div>
    )
}
export default PaymentB;
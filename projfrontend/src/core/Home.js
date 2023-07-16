import React, {useState, useEffect} from "react"
import { getProducts } from "./helper/coreapicalls";
import Base from "./Base";
import "../style.css"
import Card from "./Card";

const Home = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        //API call
        loadAllProducts();
        // eslint-disable-next-line
    }, []);

    const loadAllProducts = () => {
        getProducts().then((data) => {
            if (data.error) {
                setError(data.error)
                console.log(error)
            } else {
                setProducts(data)
            }
        });
    };

    

    return (
        <Base title="Home Page" description="This is Home Page">
            <h1>Home Page Component</h1>
            <div className="row">
                {products.map((product, index) => {
                    return(
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}

export default Home;
import {useIngredient} from "./ContextFile";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import CartOrderList from "./CartOrderList";
import {Outlet} from "react-router";

/**
 * the cart page will show the pizzas with the chosen ingredients that the user has added to order.
 * will show also with the total price.
 * will allow to continue to the form to place the order if the user at least added one pizza.
 * user can go back to home or add more pizza. or can continue to the form
 * @returns {Element}
 * @constructor
 */
export default function Cart() {

    const {carts} = useIngredient();

    const [error, setError] = useState(false);

    return (
        <div>

            <CartOrderList />

            <br/>

            <h3>Total: {carts.reduce((acc, inner) => acc + inner.length , 0) * 3 + carts.length * 10}$</h3>

            <Link to={ (carts.length === 0) ? "" : "/form"}>
                <button className="btn btn-primary btn-lg me-3"
                        onClick={() => setError(()=> carts.length === 0)}>
                    Add Your Info To Place Order
                </button>
            </Link>

            <Link to="/order">
                <button className="btn btn-primary btn-lg me-3" > Add Pizza! </button>
            </Link>

            <Link to="/">
                <button className="btn btn-primary btn-lg me-3" > Home </button>
            </Link>
            <Outlet/>

            {(error && carts.length === 0) && <p style={{color: 'red'}}>You must Order at least one pizza to continue.</p>}

        </div>
    );
}
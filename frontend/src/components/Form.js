import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import {status, useIngredient} from "./ContextFile";

/**
 * the form page: the user need to input his first and last name, his full address
 * and his phone number. then if the user filled all the inputs, he can
 * place the order. and get a code for his order to check it later.
 * we use cookie to save user data.
 * the cart will be emptied after receiving the code.
 * @returns {Element}
 * @constructor
 */
export default function Form() {

    const { carts, dispatch, setCheck } = useIngredient();
    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState(() => {
        const savedFormData = Cookies.get('formData');
        return savedFormData ? JSON.parse(savedFormData) : {};
    });

    const [code, setCode] = useState(-1);

    /**
     * handle the input change in all fields
     * @param e
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    /**
     * every time the data in the form changed we save it in the cookies
     */
    useEffect(() => {
        Cookies.set('formData', JSON.stringify(formData), { expires: 7 });
    }, [formData]);


    /**
     * send the user data to the backend and get the generated code.
     * then empty the cart.
     * @param event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/order", {
            method: "POST",
            body: JSON.stringify({ formData, carts }),
            headers: { "Content-Type": "application/json" },
        })
        .then(status)
        .then((response) => response.json())
        .then((data) => {
            setCode(() => parseInt(data.id));
            dispatch({type: 'init'});
            setCheck(Array(10).fill(false));
        })
        .catch(() => setIsError(true));
    }

    return (
        <>
            <br/>
            {code !== -1 ? (
                <h3> Your Code is {code}.</h3>
            ) : (
                <>
                    <form className="row g-3" method="post" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label className="form-label">First name</label>
                            <input type="text" className="form-control"
                                name="firstName"
                                onChange={handleChange}
                                value={formData.firstName}
                                required/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Last name</label>
                            <input type="text" className="form-control"
                                name="lastName"
                                onChange={handleChange}
                                value={formData.lastName}
                                required/>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control"
                                name="city"
                                onChange={handleChange}
                                value={formData.city}
                                required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Street</label>
                            <input type="text" className="form-control"
                                name="street"
                                onChange={handleChange}
                                value={formData.street}
                                required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">House Number</label>
                            <input type="number" className="form-control"
                                name="house"
                                onChange={handleChange}
                                value={formData.house}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control"
                                name="phone"
                                pattern="[0-9]{10}"
                                onChange={handleChange}
                                value={formData.phone}
                                placeholder="the phone number must contain exactly 10 digits"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary">Order Now!</button>
                        </div>
                    </form>
                    <br />
                    <Link to="/cart">
                        <button className="btn btn-primary me-3">Return To Cart</button>
                    </Link>
                </>
            )}
            <Link to="/">
                <button className="btn btn-primary me-3">Go Home</button>
            </Link>
            <Outlet />
            {isError && <p style={{color: 'red'}}>Error: we could not send your order. Try again.</p> }

        </>
    );
}


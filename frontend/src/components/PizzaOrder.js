import React, {useState} from "react";
import Ingredient from "./Ingredient";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";
import {useIngredient} from "./ContextFile";
import { useParams } from "react-router-dom";

/**
 * the build pizza page: will show the ingredient to start making the pizza.
 * the user can go to the cart and view it or add the pizza then go the cart.
 * if the user choose less than 2 ingredient will not allow adding the pizza to the cart.
 * @returns {Element}
 * @constructor
 */
export default function PizzaOrder() {

    const { ingredient, checked, setCheck, carts, dispatch} = useIngredient();
    const [error, setError] = useState(false);

    let { indexToEdite } = useParams();
    const toEditeCheck = new Array(10).fill(false);

    if (indexToEdite)
        carts[indexToEdite].forEach(num => toEditeCheck[num] = true);
    const [edite, setEdite] = useState(toEditeCheck);
    const check = indexToEdite ?  edite : checked;

    /**
     * set the checked ingredient
     * @param updatedCards
     */
    const setCard = (updatedCards) => {
        setCheck(updatedCards);
        setEdite(updatedCards);
    }

    /**
     * sum the chosen ingredient
     * @param cards
     * @returns {*}
     */
    const calculateSum = (cards) => cards.reduce((acc, num) => acc + num, 0);
    const sum = calculateSum(check);

    /**
     * add the new ingredient to the cart.
     * if there is less than 2 ingredient, do not allow the addition
     */
    const handleClick = () => {
        setError(()=> sum < 2);

        if (sum >= 2)
        {
            const result = ingredient
                .map((obj, index) => (check[index] ? index : null))
                .filter(obj => obj !== null);

            if (indexToEdite)
                dispatch({type: 'edite', index: indexToEdite, newChecked: result});
            else
                dispatch({ type: 'add', result: result, });
        }
    };

    return (
        <div className="container">

            <Ingredient  setCard={setCard} check={check}/>

            <div className="d-flex justify-content-center align-items-center">
                <Link to={(sum < 2) ? "" : "/cart"}>
                    <button className="btn btn-primary btn-lg me-3" onClick={handleClick}>
                        {indexToEdite ? 'Save' : 'Add To Cart'}
                    </button>
                </Link>

                <Link to="/cart">
                    <button className="btn btn-primary btn-lg me-3">
                        {indexToEdite ? 'Cancel And' : ''} Go To Cart
                    </button>
                </Link>

                <Link to="/">
                    <button className="btn btn-primary btn-lg me-3">Go Home</button>
                </Link>
                <Outlet/>
            </div>

            <div className="d-flex justify-content-center align-items-center">
                {error && <p style={{color: 'red'}}>You must choose at least 2 ingredient.</p>}
            </div>
        </div>
    );
}
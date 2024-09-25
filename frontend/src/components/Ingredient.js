import {useIngredient} from "./ContextFile";
import React from "react";

/**
 * the ingredient cards: will first get the ingredient list from the backend, then
 * will allow choosing the ingredient of the pizza.
 * @param check - the checked ingredient
 * @param setCard - set function of the ingredient
 * @returns {Element}
 * @constructor
 */
export default function Ingredient({ check, setCard }) {

    const { ingredient, isLoading, isError} = useIngredient();

    /**
     * check and uncheck the ingredient
     * @param index
     */
    const toggleCardColor = (index) => {
        const updatedCards = check.map((card, i) => {
            if (i === index)
                return !card;
            return card;
        });

        setCard(updatedCards);
    };

    return (
        <>
            <h1 className="text-center mt-5 mb-4">Our Toppings</h1>

            {isLoading ? 'loading data...' :
                <div className="row row-cols-1 row-cols-sm-6 g-3">
                    {ingredient.map((card, index) => (
                        <div className="col" key={index}>
                            <div className={`card h-100 ${check[index] ? 'bg-primary text-white' : ''}`}
                                 onClick={() => toggleCardColor(index)}>
                                <img src={`data:image/jpeg;base64,${card.image}`}
                                     className="card-img-top img-fluid rounded"
                                     alt={card.name}/>
                                <div className="card-body">
                                    <p className="card-text"><b>{card.name}</b></p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            }
            {
                isError && <p style={{color: 'red'}}>Error: failed to get the ingredient list. </p>
            }
            <br/>
        </>
    );
}
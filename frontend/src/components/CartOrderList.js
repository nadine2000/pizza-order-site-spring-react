import {useIngredient} from "./ContextFile";
import {Link} from "react-router-dom";
import {Outlet} from "react-router";

/**
 * the list of pizzas that the user has inputted with every pizza price under it.
 * the user can edite or delete any pizza in the order.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CartOrderList() {

    const {ingredient, carts, dispatch} = useIngredient();

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
                carts.map((pizza, index) => (
                    <div className="col" key={index}>
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Pizza #{index + 1}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                {pizza.map((ing, i) => (
                                    <li key={i} className="list-group-item">{ingredient[ing].name}</li>))}
                                <li key={pizza.length} className="list-group-item"><b>Price:</b> {3 * pizza.length + 10}$
                                </li>
                            </ul>
                            <div className="card-body">
                                <Link to={`/order/${index}`}> Edite </Link>  { ' '} |  { ' '}
                                <Link to="/cart" onClick={() => dispatch({type: 'delete', index: index,})}>
                                    Delete
                                </Link>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
import { useIngredient} from "./ContextFile";

/**
 * show the info of the customer and its order
 * @param data - customer order and data
 * @returns {JSX.Element}
 * @constructor
 */
export default function OrderInfo({data}) {
    const { ingredient } = useIngredient();
    return (
        <div>
            {
                <div>
                    <h1>Customer Information:</h1>
                    {Object.entries(data.formData).map(([key, value]) => (
                        <p key={key}>
                            <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {value}
                        </p>
                    ))}
                </div>
            }
            <h1>Customer Order:</h1>
            {
                data.carts.map((pizza, index) => (
                    <div className="col" key={index}>
                        <div>
                            <div>
                                <h5>Pizza #{index + 1}</h5>
                            </div>
                            <ul>
                                {pizza.map((ing, i) => (
                                    <li key={i} className="list-group-item">{ingredient[ing].name}</li>))}
                                <li key={pizza.length} className="list-group-item">Price: {3 * pizza.length + 10}$
                                </li>
                            </ul>
                        </div>
                    </div>

                ))
            }
            < h3> Your
                Total: {data.carts.reduce((acc, inner) => acc + inner.length, 0) * 3 + data.carts.length * 10}</h3>
        </div>
    );
}
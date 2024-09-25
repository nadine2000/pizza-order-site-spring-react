import {useState} from "react";
import CheckOrder from "./CheckOrder";
import PizzaOrder from "./PizzaOrder";

/**
 * the home page: will allow either starting an order
 * or checking an already existing order.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Home() {
    const [button, setButton] = useState('');
    const handleClick = (buttonNumber) => {
        setButton((prev) => (prev === buttonNumber ? '' : buttonNumber));
    };

    return (
        <div>
            <br></br>
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-primary btn-lg me-3"
                        onClick={() => handleClick('1')}> new order</button>
                <button className="btn btn-primary btn-lg"
                        onClick={() => handleClick('2')}> check order</button>
            </div>
            {button === '1' && <PizzaOrder />}
            {button === '2' && <CheckOrder />}
        </div>
    );
}
import { useState} from "react";
import { useDataApi} from "./ContextFile";
import OrderInfo from "./OrderInfo";

/**
 * the check order page will allow to input your order code
 * to view the order details with the order customer info
 * if the code does exit, if not there will be an error will show error message.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CheckOrder() {
    const [code, setCode] = useState('');
    const [data, isLoading, isError, setUrl] = useDataApi();

    /**
     * get the user order from backend
     * @param e
     */
    function handleSubmit(e) {
        e.preventDefault();
        setUrl(`/api/${code}`);
    }

    return (
        <div>
            <br/>
            <form onSubmit={handleSubmit} className="d-flex">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Customer's code"
                           aria-label="Customer's code" aria-describedby="button-addon2"
                            required
                           value={code || ''}
                           onChange={(event) => setCode(event.target.value)}
                    />
                    <button className="btn btn-outline-secondary" type="submit"> Check </button>
                </div>
            </form>

            {isLoading && <p >Loading...</p>}
            {isError && code !== '' && <p style={{color: 'red'}}>This Code Does Not Exist. Or Failed to connect to database.</p>}
            {( data !== null && data !== undefined && !isError ) && <OrderInfo data={data}/>}
        </div>
    );
}
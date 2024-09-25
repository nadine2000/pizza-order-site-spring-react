import { createContext, useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';

const DataContext = createContext();

/**
 * check status function
 * @param response the url response
 * @returns {Promise<never>|Promise<Awaited<*>>} the response is valid or not
 */
export const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

/**
 * fetch GET method data
 * @param urll the url to connect to
 * @param initialData the initial data to init
 * @param noDep - boolean if u should not allow dependencies
 * @returns {[unknown,boolean,boolean,(value: unknown) => void]}
 */
export const useDataApi = (urll, initialData, noDep) => {

    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(urll);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const dep = noDep ? [] : [url];

    useEffect(() => {
        if (url !== undefined) {
            let didUnmount = false;
            const fetchData = async () => {
                setIsError(false);
                setIsLoading(true);
                try {
                    const result = await axios(url);
                    if (!didUnmount)
                        setData(result.data);
                } catch (error) {
                    if (!didUnmount)
                        setIsError(true);
                } finally {
                    if (!didUnmount)
                        setIsLoading(false);
                }
            };
            fetchData();
            return () => {
                didUnmount = true;
            };
        }
    }, dep);

    return [ data, isLoading, isError, setUrl ];
};

/**
 * cart reducer function edite add init or delete pizza from cart
 * @param cart cart state
 * @param action action to do on the cat state
 * @returns {*|*[]} the new cart state
 */
function cartReducer(cart, action) {
    switch (action.type) {
        case 'edite': {
            return cart.map((innerArray, index) => {
                if (index === parseInt(action.index)) {
                    return action.newChecked;
                }
                return innerArray;
            });
        }
        case 'delete': {
            return cart.slice(0, action.index).concat(cart.slice(1 + action.index))
        }
        case 'add': {
            return [...cart, action.result];
        }
        case 'init': {
            return [];
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

/**
 * ingredient provider, fetch only one time the ingredient to use multiple times.
 * return fetch data if there is an error, loading state, and return the ingredient data.
 * in addition, the checked ingredient to save them every time the user come back to the
 * pizza order(build) page.
 * last the cart which us the list of pizzas with their ingredient.
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function IngredientProvider({ children }) {

    const [checked, setCheck] = useState(Array(10).fill(false));
    const [carts, dispatch] = useReducer(cartReducer, []);
    const [ingredient, isLoading, isError] = useDataApi("/api/ingredient", [], true);

    return (
        <DataContext.Provider value={{ ingredient, checked, setCheck, carts, dispatch, isLoading, isError }}>
            {children}
        </DataContext.Provider>
    );
}

/**
 * use ingredient context to use the state in the providing children
 * @returns {unknown}
 */
export function useIngredient() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useIngredient must be used within a IngredientProvider');
    }
    return context;
}
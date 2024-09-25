import {Link} from "react-router-dom";
import {Outlet} from "react-router"

/**
 * represent the error page for unknown links.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ErrorPage() {
    return (
        <div className="text-center">
            <h1>Error: Page Not Found</h1>
            <Link to="/">
                <button className="btn btn-primary">
                    GO TO HOME PAGE
                </button>
            </Link>
            <Outlet/>
        </div>
    );
}
import React from 'react';
import Individual from "./individual-details";
import {Link} from 'react-router-dom';

export default function WatchDetails(params) {
    console.log("details", params.params.details);
    let props=params.params.details;

    //if(params.params.token.obj === "Viewer"){
        return(
            <div>
                <Link to={"/profile/list"} exact="true">Back to List</Link>
                <Individual props={props}/>
            </div>
        );
    // } else if(params.params.token.obj === "Seller") {
    //     return(
    //         <div>
    //             <Link to={"/profile/watchlist"} exact="true">Back to Watch-List</Link>
    //             <Individual props={props}/>
    //             <Link to={"/profile/sellerlist"} exact="true">Back to Sell-List</Link>
    //             <Individual props={props}/>
    //         </div>
    //     );
    // }

}
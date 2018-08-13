import React from 'react';
import _ from "underscore";
import {Link} from "react-router-dom";

export default function ReviewDetails(props) {

    console.log("movie reviews",props.props.movie_review);
    let list = props.props.movie_review;
    let show = _.map(list, (ll, i) => <Maps key={i} r={ll}/>);

    if(list.length === 0){
        return (
            <div>
                <Link to={"/profile"} exact="true">Back to WatchList</Link>
                <div>
                    no reviews found for {props.props.details.Title}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Link to={"/profile"} exact="true">Back to WatchList</Link>
                <div>
                    reviews for {props.props.details.Title}
                </div>
                { show }
            </div>
        )
    }
}

function Maps(props) {
    console.log(props);
    return(
        <div>
            Details: {props.r.description}
        </div>
    );
}
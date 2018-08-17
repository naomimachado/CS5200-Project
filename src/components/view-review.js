import React from 'react';

import {Card, CardBody} from "reactstrap";
import {Link} from "react-router-dom";

export default function ViewReview(params) {

    return (
        <div>
            <Link to={"/profile/list"} exact="true">Back to Profile</Link>
            <h3>Review Details</h3>
            <Card>
                <CardBody>
                    <div>IMDB ID: {params.params.details.imdbID}</div>
                    <div>Title: {params.params.details.Title}</div>
                    <div>Thoughts: {params.params.view_review.description}</div>
                </CardBody>
            </Card>
        </div>
    );
}

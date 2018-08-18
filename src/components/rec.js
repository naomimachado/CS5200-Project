import React from 'react';
import _ from 'underscore';
import {Button} from 'reactstrap';
import api from '../api';
import {Link} from "react-router-dom";

export default function Recommendations(props) {

    let list = props.props.rec;
    console.log("rec", list);

    let show = _.map(list, (ii, key) => <Results d={ii} key={key}/>);
    return <div>
        {show}
    </div>;
}

function Results(props) {

    function getDetails() {
        console.log("tmdb id", props.d.id);
        api.get_movie_imdbid(props.d.id);
    }

    function getDetails1() {
        console.log("tmdb id", props.d.id);
        api.get_tv_imdbid(props.d.id);
    }

    if(props.d.original_title) {
        return <div>
            Title: {props.d.original_title}
            <Link to={"/profile/recommendations/" + props.d.id}>
                <Button onClick={getDetails}>Get Details</Button>
            </Link>
        </div>;
    } else {
        return <div>
            Title: {props.d.original_name}
            <Link to={"/profile/recommendations/" + props.d.id}>
                <Button onClick={getDetails1}>Get Details</Button>
            </Link>
        </div>;
    }

}
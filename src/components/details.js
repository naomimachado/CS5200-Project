import React from 'react';

import {Card, CardBody, CardTitle, Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import api from "../api";

export default function Details(params) {
    console.log("details", params.params.details);
    let props=params.params.details;

    function add() {
        if(params.params.token == null){
            params.params.dispatch({type: 'ERROR', msg: 'Please login'});
        } else {
            alert("make api call")
        }
    }

    function submit() {
        api.search_request(params.params.search_tab.search , params.params.page.page);
    }
    return(
        <div>
            <Link to="/results"><Button onClick={submit}>Back to List</Button></Link>
            <Card>
                <CardBody>
                    <CardTitle>
                        {props.Title}
                    </CardTitle>
                    <div>
                        <img src={props.Poster} alt="Poster" className="float-right"/>
                        <ul>
                            <li>
                                Plot: {props.Plot}
                            </li>
                            <li>
                                Actors: {props.Actors}
                            </li>
                            <li>
                                Director: {props.Director}
                            </li>
                            <li>
                                Writer: {props.Writer}
                            </li>
                            <li>
                                Genre: {props.Genre}
                            </li>
                            <li>
                                Runtime: {props.Runtime}
                            </li>
                            <li>
                                Released: {props.Released}
                            </li>
                            <li>
                                Imdb Rating: {props.imdbRating}
                            </li>
                            <li>
                                Imdb Votes: {props.imdbVotes}
                            </li>
                            <li>
                                Awards: {props.Awards}
                            </li>
                        </ul>
                        <Button onClick={add}>Add to Watchlist</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
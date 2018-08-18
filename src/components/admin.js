import React from 'react';
import _ from 'underscore';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import api from '../api';

export default function Admin(props) {

    console.log("admin props", props);

    let person = props.props.person_list;

    let disp_person = _.map(person, (kk, i) => <Person person={kk} key={i} token={props.props.token}/>);

    let movies = props.props.movie_list;

    let disp_movie = _.map(movies, (mm, i) => <Movie movie={mm} key={i}/>);

    let links = props.props.link_list;

    let disp_link = _.map(links, (ll, i) => <Links link={ll} key={i}/>);

    let reviews = props.props.review_list;

    let disp_review = _.map(reviews, (rr, i) => <Review review={rr} key={i}/>);

    return <div>
        <div>
            <Link to={"/system/createUser"}>
                <Button>Create New User</Button>
            </Link>
        </div>
        <div>
            List of users:
            {disp_person}
        </div>
        <div>
            List of Movies:
            {disp_movie}
        </div>
        <div>
            List of Links:
            {disp_link}
        </div>
        <div>
            List of Reviews:
            {disp_review}
        </div>
    </div>;
}

function Person(props) {
    console.log("person props", props);

    function getPerson() {
        console.log("person id", props.person.id);
        api.find_user(props.person.id);
    }

    return (
        <div>
            {props.person.firstName}
            <Link to={"/system/user"}>
                <Button onClick={getPerson}>View</Button>
            </Link>
        </div>
    );
}

function Movie(props) {
    console.log("movie props", props);

    function getMovie() {
        api.get_details(props.movie.imdbid);
    }

    return (
        <div>
            {props.movie.title}
            <Link to={"/system/movie"}>
                <Button onClick={getMovie}>View</Button>
            </Link>
        </div>
    );
}

function Links(props) {
    console.log("link props", props);

    function getLink() {
        api.get_link(props.link.id);
        api.get_details(props.link.movie.imdbid);
    }

    return (
        <div>
            {props.link.link}
            <Link to={"/system/link"}>
                <Button onClick={getLink}>View</Button>
            </Link>
        </div>
    );
}

function Review(props) {
    console.log("review props", props);

    function getReview() {
        api.get_review(props.review.id);
        api.get_details(props.review.movie.imdbid);
    }

    return (
        <div>
            {props.review.title}
            <Link to={"/system/review"}>
                <Button onClick={getReview}>View</Button>
            </Link>
        </div>
    );
}
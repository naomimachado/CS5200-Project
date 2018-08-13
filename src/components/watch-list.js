import React from 'react';
import _ from 'underscore';
import Cookies from "universal-cookie";
import api from "../api";
import { Card } from "reactstrap";
import { CardBody } from "reactstrap";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

export default function WatchList(props) {
    console.log(props.props.watchlist);
    let list = props.props.watchlist;
    let slist = props.props.seller_list;
    let rlist = props.props.critic_review;

    let cookie = new Cookies();
    let obj1;
    if(props.props.token==null){
        obj1 = cookie.get('obj');
    } else {
        obj1 = props.props.token.obj;
    }

    let disp = _.map(list, (ll, i) => <Result key={i} watchlist={ll}/>);
    let sdisp = _.map(slist, (kk, i) => <Result1 key={i} sellerlist={kk}/>);
    let rdisp =  _.map(rlist, (ss, i) => <Result2 key={i} reviewlist={ss}/>);

    if(obj1 === "Viewer") {
        return (
            <div>
                My Watch list
                {disp}
            </div>
        );
    } else if(obj1 === "Seller") {
        return (
            <div>
                <div>
                My Watch list
                {disp}
                </div>
                <div>
                    My Selling Links
                    { sdisp }
                </div>
            </div>
        );
    } else if(obj1 === "Critic") {
        return (
            <div>
                <div>
                    My Watch list
                    {disp}
                </div>
                <div>
                    My Reviews
                    {rdisp}
                </div>
            </div>
        );
    }
}


function Result(props){
    let cookie = new Cookies();

    function details() {
        api.get_details(props.watchlist.movie.imdbid);
    }

    let id = cookie.get('id');

    function removeFromWatchlist(){
        api.remove_from_watchlist(id,props.watchlist.id);
    }

    function toggleWatched(){
        api.toggle_watched(id,props.watchlist.movie.imdbid);
    }

    function getBuyingLinks(){
        api.get_details(props.watchlist.movie.imdbid);
        api.get_links(props.watchlist.movie.imdbid);
    }

    function reviews(){
        //alert("get movie reviews from local db");
        api.get_details(props.watchlist.movie.imdbid);
        api.get_movie_reviews(props.watchlist.movie.imdbid);
    }

    let val="";

        if(props.watchlist.watched){
            val = "Watched";
        } else {
            val = "Not Watched";
        }

    console.log("inside display",props);
    return <Card>
        <CardBody>
            <div>
                Title:{props.watchlist.movie.title}
                <Link to={"/profile/list/"+ props.watchlist.movie.imdbid}>
                    <Button onClick={details} className="btn btn-info">Details</Button>
                </Link>
                <Link to={"/reviews/"+ props.watchlist.movie.imdbid}>
                    <Button onClick={reviews} className="btn btn-info">Reviews</Button>
                </Link>
                <Button className="btn btn-primary" onClick={toggleWatched}>{val}</Button>
                <Link to={"/buyingOptions"}>
                    <Button className="btn btn-primary" onClick={getBuyingLinks}>Buy</Button>
                </Link>
                <Button onClick={removeFromWatchlist} className="btn btn-danger"> Remove </Button>
            </div>
        </CardBody>
    </Card>;
}

function Result1(props){
    let cookie = new Cookies();

    function details() {
        api.get_details(props.sellerlist.movie.imdbid);
    }

    function removeFromSellerlist(){
        let id = cookie.get('id');
        api.remove_from_sellerlist(id, props.sellerlist.id);
    }

    function editLink(){
        let id = cookie.get('id');
        api.get_details(props.sellerlist.movie.imdbid);
        api.get_link(props.sellerlist.id);

    }

    console.log("inside display",props);
    return <Card>
        <CardBody>
            <div>
                Title:{props.sellerlist.movie.title}
                <Link to={"/profile/list/"+ props.sellerlist.movie.imdbid}>
                    <Button onClick={details} className="btn btn-info">Details</Button>
                </Link>
                <Link to={"/viewLink/"+ props.sellerlist.id}>
                    <Button onClick={editLink} className="btn btn-info">View Link</Button>
                </Link>
                <Link to={"/link/"+ props.sellerlist.id}>
                    <Button onClick={editLink} className="btn btn-info">Edit Link</Button>
                </Link>
                <Button onClick={removeFromSellerlist} className="btn btn-danger"> Delete Link </Button>
            </div>
        </CardBody>
    </Card>;
}


function Result2(props){
    let cookie = new Cookies();

    function details() {
        //api.get_details(props.sellerlist.movie.imdbid);
    }

    function removeFromSellerlist(){
        // let id = cookie.get('id');
        // api.remove_from_sellerlist(id, props.sellerlist.id);
    }

    function editLink(){
        // let id = cookie.get('id');
        // api.get_details(props.sellerlist.movie.imdbid);
        // api.get_link(props.sellerlist.id);

    }

    console.log("inside display",props);
    return <Card>
        <CardBody>
            <div>
                Title:{props.reviewlist.movie.title}
                    <Button onClick={details} className="btn btn-info">Details</Button>
                    <Button onClick={editLink} className="btn btn-info">View Review</Button>
                    <Button onClick={editLink} className="btn btn-info">Edit Review</Button>
                <Button onClick={removeFromSellerlist} className="btn btn-danger"> Delete Review</Button>
            </div>
        </CardBody>
    </Card>;
}
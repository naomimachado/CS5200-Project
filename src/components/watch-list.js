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
    let cookie = new Cookies();
    let obj1;
    if(props.props.token==null){
        obj1 = cookie.get('obj');
    } else {
        obj1 = props.props.token.obj;
    }

    let disp = _.map(list, (ll, i) => <Result key={i} watchlist={ll}/>);
    let sdisp = _.map(slist, (ll, i) => <Result key={i} watchlist={ll}/>);

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
    }
}


function Result(props){
    let cookie = new Cookies();

    function details() {
        api.get_details(props.watchlist.imdbid);
    }

    function removeFromWatchlist(){
        let id = cookie.get('id');
        api.remove_from_watchlist(id, props.watchlist.imdbid);
    }



    console.log("inside display",props);
    return <Card>
        <CardBody>
            <div>
                Title:{props.watchlist.title}
                <Link to={"/profile/watchlist/"+ props.watchlist.imdbid}>
                    <Button onClick={details} className="btn btn-info">Details</Button>
                </Link>
                <Button className="btn btn-primary">Buy</Button>
                <Button onClick={removeFromWatchlist} className="btn btn-danger"> Remove </Button>
            </div>
        </CardBody>
    </Card>;
}
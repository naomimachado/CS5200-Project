import React from 'react';

import {Card, CardBody, Button} from 'reactstrap';

import _ from 'underscore';

import api from '../api';

export default function ShowResults(params){

    let current_page = params.params.page.page;

    function prev_ten() {
        console.log(params.params.page.page);
        if (current_page === 1){
            alert("No more previous pages");
        }
        else {
            api.search_request(params.params.search_tab.search , current_page - 1);
        }

    }

    function next_ten() {
        console.log(params.params.page.page);
        console.log(fir.totalResults);

        let next_pages = Math.round(fir.totalResults/10);
        console.log(next_pages);

        if (current_page >= next_pages){
            alert("No more next pages");
        }
        else {
            api.search_request(params.params.search_tab.search , current_page + 1);
        }
    }



    console.log("inside show results",params);
    let fir = _.first(params.params.results);
    console.log("first element",fir);
    let arr = fir.Search;
    console.log(arr);

    let res = _.map(arr, (nn, i) => <Result key={i} result={nn} />);

    if(fir.Response === "False"){
        return <div>
            <p>No results found, try a different search keyword!</p>
        </div>;
    }
    else {
        return <div className="col">
            {res}
            <Button onClick={prev_ten}>&laquo; Previous</Button>
            <Button onClick={next_ten}>Next &raquo;</Button>
        </div>;
    }
}

function Result(params){

    console.log(params);
    return <Card>
        <CardBody>
            <div>
                <p>Movie Title:{params.result.Title}</p>
                <Button onClick={details}>Show Details</Button>
            </div>
        </CardBody>
    </Card>;
}

function details() {
    alert("TODO- Ask User to sign in!!!");
}


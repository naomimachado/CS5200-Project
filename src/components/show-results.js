import React from 'react';

import {Card, CardBody, Button} from 'reactstrap';

import {Link} from 'react-router-dom';

import _ from 'underscore';

import api from '../api';

export default function ShowResults(params){

    let current_page = params.params.page.page;

    function prev_ten() {
        console.log(params.params.page.page);
        if (current_page === 1){
            params.dispatch({type: 'ERROR', msg: 'This is the first page'});
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
            params.dispatch({type: 'ERROR', msg: 'No more pages to show'});
        }
        else {
            api.search_request(params.params.search_tab.search , current_page + 1);
        }
    }



    console.log("inside show results",params);
    let fir = params.params.results;
    console.log("first element",fir);
    let arr = fir.Search;
    console.log(arr);

    let res = _.map(arr, (nn, i) => <Result key={i} result={nn} />);

    if(fir.Response === "False"){
        params.dispatch({type:'CLEAR_SEARCH_TAB'});
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

    function details() {
        api.get_details(params.result.imdbID);
    }

    console.log(params);
    return <Card>
        <CardBody>
            <div>
                <p>Title:{params.result.Title}</p>
                <Link to={"/results/"+ params.result.imdbID}><Button onClick={details}>Show Details</Button></Link>
            </div>
        </CardBody>
    </Card>;
}




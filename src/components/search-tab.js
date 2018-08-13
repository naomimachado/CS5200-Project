import React from 'react';

import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import { Link } from 'react-router-dom';

import $ from 'jquery';
import api from '../api';
import Cookies from 'universal-cookie';

function SearchTab(params) {

    function update(ev) {
        let tgt = $(ev.target);

        let data = {};
        data[tgt.attr('name')] = tgt.val();
        console.log("data",data);
        let action = {
            type: 'UPDATE_SEARCH_TAB',
            data: data,
        };
        console.log(action);
        params.dispatch(action);

    }

    function submit() {
        let cookies = new Cookies();
        if(params.search_tab.search === ""){
            params.dispatch({type: 'ERROR', msg: 'Please enter a keyword to search!'});
        } else if(params.search_tab.search){
            //cookies.set('search', params.search_tab.search);
            //cookies.set('page', 1);
            cookies.set('search', params.search_tab.search);
            console.log("cookie set");
            let data = params.search_tab.search;
            //params.dispatch({type:'SET_SEARCH_TOKEN', data: data});
            api.search_request(params.search_tab.search, 1);
            //params.dispatch({type:'CLEAR_SEARCH_TAB'});
        } else {
            let search = cookies.get('search');
            console.log("should make api query to omdb");
            //params.dispatch({type:'SET_SEARCH_TOKEN', data: search});
            api.search_request(params.search_token, 1);
            //console.log(params.search_tab);
        }
    }

    function reload() {
        window.location.reload();
    }

    return <div style={ {padding: "4ex"} }>
        <h2>Search Tab</h2>
        <Link to="/" exact="true"><Button onClick={reload}>Start Again?</Button></Link>
        <FormGroup>
            <Label for="search"></Label>
            <Input type="text" name="search" value={params.search_tab.search} onChange={update} placeholder="Search for movies and TV shows"/>
        </FormGroup>
        <Link to={"/results"} exact="true"><Button onClick={submit} color="primary"><i className="fa fa-search"></i></Button></Link>
    </div>;
}

function state2props(state) {
    console.log("rerender", state);
    return { search_tab: state.search_tab };
}

export default connect(state2props)(SearchTab);
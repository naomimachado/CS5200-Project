import React from 'react';

import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import { Link } from 'react-router-dom';

import $ from 'jquery';
import api from '../api';

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
        console.log("should make api query to omdb");
        console.log(params.search_tab);
        api.search_request(params.search_tab.search,1);
        //params.dispatch({type:'CLEAR_SEARCH_TAB'});
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
        <Link to="/results" exact="true"><Button onClick={submit} color="primary"><i className="fa fa-search"></i></Button></Link>
    </div>;
}

function state2props(state) {
    console.log("rerender", state);
    return { search_tab: state.search_tab };
}

export default connect(state2props)(SearchTab);
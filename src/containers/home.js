
import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import SearchTab from './search-tab';
import ShowResults from './show-results';
import Nav from './nav';

let Page = connect((state) => state)((props) => {
    if(props.results.length > 0){
        return (
            <Router>
                <div className="container-fluid">
                    <Nav />
                    <Route path="/results" exact={true} render={
                        ()=>
                            <div>
                                <SearchTab params={props} root={this}/>
                                <ShowResults params={props} />
                            </div>
                    } />
                </div>
            </Router>
        )
    }
    else {
        return (
            <Router>
                <div className="container-fluid">
                    <Nav />
                    <Route path="/" exact={true} render={
                        () =>
                            <div>
                                <SearchTab params={props} root={this}/>
                            </div>
                    }/>
                    <Route path="/results" exact={true} render={
                        ()=>
                            <div>
                                <SearchTab params={props} root={this}/>
                            </div>
                    } />
                </div>
            </Router>)
    }
});

export default Page;

import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import SearchTab from './search-tab';
import ShowResults from './show-results';
import Nav from './nav';
import RegistrationForm from './registration-form';
import Details from './details';
import TitleNav from './title-nav';

let Page = connect((state) => state)((props) => {
    if(props.results){
        return (
            <Router>
                <div className="container-fluid">
                    <Route path="/" exact={true} render={
                        () =>
                            <div>
                                <TitleNav/>
                                <Nav props={props}/>
                                <div className="errors">{props.errors}</div>
                                <SearchTab params={props} root={this}/>
                            </div>
                    }/>
                    <Route path="/results" exact={true} render={
                        ()=>
                            <div>
                                <TitleNav/>
                                <Nav props={props}/>
                                <div className="errors">{props.errors}</div>
                                <SearchTab params={props} root={this}/>
                                <ShowResults params={props} />
                            </div>
                    } />
                    <Route path="/results/:imdbID" exact={true} render={
                        ()=>
                            <div>
                                <TitleNav/>
                                <Nav props={props}/>
                                <div className="errors">{props.errors}</div>
                                <Details params={props}/>
                            </div>
                    } />
                    <Route path="/registration" exact={true} render={
                        ()=>
                            <div>
                                <TitleNav/>
                                <div className="errors">{props.errors}</div>
                                <RegistrationForm params={props}/>
                            </div>
                    } />
                </div>
            </Router>
        )
    }
});

export default Page;

import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import SearchTab from './search-tab';
import ShowResults from './show-results';
import Nav from './nav';
import RegistrationForm from './registration-form';
import Details from './details';
import TitleNav from "./title-nav";
import Profile from './profile';
//import Cookies from 'universal-cookie';

let Page = connect((state) => state)((props) => {
    //let cookie = new Cookies();

    if(props.results){
        return (
            <Router>
                <div className="container-fluid">
                    <Route path="/" exact={true} render={
                        () =>
                            <div>
                                <Nav props={props}/>
                                <div className="errors">{props.errors}</div>
                                <SearchTab params={props} root={this}/>
                            </div>
                    }/>
                    <Route path="/results" exact={true} render={
                        ()=>
                            <div>
                                <Nav props={props}/>
                                <div className="errors">{props.errors}</div>
                                <SearchTab params={props} root={this}/>
                                <ShowResults params={props} />
                            </div>
                    } />
                    <Route path="/results/:imdbID" exact={true} render={
                        ()=>
                            <div>
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
                    <Route path="/profile" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <Profile props={props}/>
                            </div>
                    } />
                </div>
            </Router>
        )
    }
});

export default Page;
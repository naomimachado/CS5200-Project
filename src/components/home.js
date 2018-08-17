
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
import WatchList from "./watch-list";
import WatchDetails from "./watch-details";
import AddBuyLink from './buy-link';
import ReviewForm from "./review-form";
import BuyingOptions from "./show-buying-options";
import ReviewDetails from "./review-details";
import EditLinkForm from './edit-link-form';
import ViewLink from './view-link';
import ViewReview from './view-review';
import EditReviewForm from './edit-review-form';
import Admin from './admin';
import Recommendations from './rec';
import List from './review-list';
import EditRegistrationForm from './edit-profile';


let Page = connect((state) => state)((props) => {

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
                    <Route path="/editProfile" exact={true} render={
                        ()=>
                            <div>
                                <TitleNav/>
                                <div className="errors">{props.errors}</div>
                                <EditRegistrationForm params={props}/>
                            </div>
                    } />
                    <Route path="/profile" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <Profile props={props}/>
                                <WatchList props={props}/>
                            </div>
                    } />
                    <Route path="/profile/list" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <Profile props={props}/>
                                <WatchList props={props}/>
                            </div>
                    } />
                    <Route path="/profile/list/:imdbid" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <WatchDetails params={props}/>
                            </div>
                    } />
                    <Route path="/addBuyingOptions" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <AddBuyLink params={props}/>
                            </div>
                    } />
                    <Route path="/buyingOptions" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <BuyingOptions props={props}/>
                            </div>
                    } />
                    <Route path="/link/:lid" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <EditLinkForm params={props} />
                            </div>
                    } />
                    <Route path="/viewLink/:lid" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <ViewLink params={props} />
                            </div>
                    } />
                    <Route path="/review" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <ReviewForm params={props}/>
                            </div>
                    } />
                    <Route path="/reviews/:rid" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <ReviewDetails props={props}/>
                            </div>
                    } />
                    <Route path="/viewReview" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <ViewReview params={props}/>
                            </div>
                    } />
                    <Route path="/editReview" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <EditReviewForm params={props}/>
                            </div>
                    } />
                    <Route path="/system" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <Admin props={props}/>
                            </div>
                    } />
                    <Route path="/recommendations" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <Recommendations props={props}/>
                            </div>
                    } />
                    <Route path="/viewer/critic" exact={true} render={
                        ()=>
                            <div>
                                <Nav/>
                                <div className="errors">{props.errors}</div>
                                <List props={props}/>
                            </div>
                    } />
                </div>
            </Router>
        )
    } else {
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
                            </div>
                    } />
                </div>
            </Router>
        );
    }
});

export default Page;
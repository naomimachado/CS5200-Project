import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

let empty_search_form = {
    search: ""
};

function search_tab(state=empty_search_form, action) {
    switch (action.type) {
        case 'UPDATE_SEARCH_TAB':
            return Object.assign({},state, action.data);
        case 'CLEAR_SEARCH_TAB':
            return empty_search_form;
        default:
            return state;
    }
    
}


let empty_results = {
    results: []
}

function results(state=empty_results, action) {
    switch (action.type) {
        case 'SEARCH_RESULTS':
            return [action.data];
        default:
            return state;

    }
}

let initial_page= {
    page:""
};

function page(state=initial_page, action) {
    switch (action.type) {
        case 'UPDATE_PAGE_NO':
            return action.data;
        default:
            return state;
    }
}

let empty_login = {
    username: "",
    password: "",
};

function login(state = empty_login, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_LOGIN_FORM':
            return empty_login;
        default:
            return state;
    }
}

function root_reducer(state0, action) {
    console.log("reducer", action);
    let reducer = combineReducers({search_tab, results, page, login});
    let state1 = reducer(state0, action);
    console.log("state1", state1);
    return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
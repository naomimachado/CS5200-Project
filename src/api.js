import store from './store';
import $ from 'jquery';
import Cookies from 'universal-cookie';

class TheServer{

    search_request(data, page) {
        console.log("got this data", data);

        let URL = "http://www.omdbapi.com/?s="+ data +"&apikey=d777acf4&page="+page;
        console.log(URL);
        $.ajax(URL,
            {
                method:"get",
                dataType: "json",
                success: (resp) => {
                    console.log("data from request:", resp);
                    store.dispatch({
                        type: 'SEARCH_RESULTS',
                        data: resp
                    })
                    store.dispatch({
                        type:'UPDATE_PAGE_NO',
                        data: {page: page}
                    })

                },
                error: (resp) => {
                    console.log("error occurred", resp)
                }
            });
    }

    get_details(data) {
        console.log("got this data", data);

        let URL = "http://www.omdbapi.com/?i="+ data +"&apikey=d777acf4";
        console.log(URL);
        $.ajax(URL,
            {
                method:"get",
                dataType: "json",
                success: (resp) => {
                    console.log("data from request:", resp);
                    store.dispatch({
                        type: 'DETAILS',
                        data: resp
                    })
                },
                error: (resp) => {
                    console.log("error occurred", resp)
                }
            });
    }


    submit_registration(data) {
        console.log(data.dtype);
        let login_data={
            "email": data.email,
            "password": data.password
        }
        if (data.dtype === "Viewer") {
            console.log("inside if");
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Viewer"
            }
            $.ajax("http://localhost:8080/api/user/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    console.log("sucess", resp);
                    this.login(login_data);
                },
                error: (resp) => {
                    console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        } else if (data.dtype === "Critic") {
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Critic"
            }
            $.ajax("http://localhost:8080/api/critic/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    console.log("sucess", resp);
                },
                error: (resp) => {
                    console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        } else if (data.dtype === "Seller") {
            let data1 = {
                "firstName": data.firstName,
                "lastName": data.lastName,
                "email": data.email,
                "password": data.password,
                "obj": "Seller"
            }
            $.ajax("http://localhost:8080/api/seller/register", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data1),
                success: (resp) => {
                    console.log("sucess", resp);

                },
                error: (resp) => {
                    console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
        }
    }

        login(data) {

            $.ajax("http://localhost:8080/api/login", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data),
                success: (resp) => {
                    console.log("sucess", resp);
                    //console.log("type", resp.);
                    const cookies = new Cookies();
                    cookies.set('firstName', resp.firstName);
                    cookies.set('email', resp.email);
                    cookies.set('obj', resp.obj);
                    store.dispatch({
                        type: 'SET_TOKEN',
                        data: resp
                    })
                    store.dispatch({
                        type: 'CLEAR_LOGIN_FORM'
                    });
                },
                error: (resp) => {
                    console.log("error", resp);
                    // store.dispatch({
                    //     type: 'CLEAR_REGISTER_FORM',
                    // })
                },
            });
    }

    logout(){
        console.log("inside logout");
        $.ajax("http://localhost:8080/api/logout", {
            method: "post",
            success: (resp) => {
                console.log("sucess", resp);
                //console.log("type", resp.);
                const cookies = new Cookies();
                cookies.remove('firstName', resp.firstName);
                cookies.remove('email', resp.email);
                cookies.remove('obj', resp.obj);
                store.dispatch({
                    type: 'RESET_TOKEN',
                    data: null
                })
            },
            error: (resp) => {
                console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }
}

export default new TheServer();
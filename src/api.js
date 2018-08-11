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
                    let movie={
                        "title": resp.Title,
                        "imdbid": resp.imdbID
                    }
                    this.save_movie(movie);
                },
                error: (resp) => {
                    console.log("error occurred", resp)
                }
            });
    }

    save_movie(data){
        console.log("saving movie",data);
        $.ajax("http://localhost:8080/api/movie", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
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
                    console.log("success", resp);
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
                    this.login(login_data);
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
                    this.login(login_data);

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
                    cookies.set('id', resp.id);
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
                    store.dispatch({type: 'ERROR', msg: 'Invalid Login! Please try again'});
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
                cookies.remove('id');
                cookies.remove('firstName');
                cookies.remove('email');
                cookies.remove('obj');
                //cookies.remove('search');
                //cookies.remove('page')
                store.dispatch({
                    type: 'RESET_TOKEN',
                    data: null
                })
                window.location.reload();
            },
            error: (resp) => {
                console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    add_to_watchlist(id, data) {
        console.log(id);
        console.log(data);
        let imdb=data.imdbid;
        let URL = "http://localhost:8080/api/movie/"+imdb+"/person/"+id+"/watchlist";
        $.ajax(URL , {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            success: (resp) => {
                console.log("sucess", resp);
                this.get_watchlist(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'CLEAR_LOGIN_FORM'
                // });
            },
            error: (resp) => {
                console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    get_watchlist(id) {
        console.log(id);
        //console.log(data);
        let URL = "http://localhost:8080/api/person/"+id+"/watchlist";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'WATCHLIST',
                    data: resp
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

    get_seller_list(id) {
        console.log(id);
        //console.log(data);
        let URL = "http://localhost:8080/api/seller/"+id+"/movielist";
        $.ajax(URL , {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                console.log("sucess", resp);

                //alert("added succesfully");
                store.dispatch({
                    type: 'SELLERLIST',
                    data: resp
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

    remove_from_watchlist(id, movieid){
        let URL = "http://localhost:8080/api/user/"+id+"/watchlist/"+movieid;
        $.ajax(URL , {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            //data: JSON.stringify(data),
            success: (resp) => {
                console.log("sucess", resp);
                this.findWatchList(id);
                //alert("added succesfully");
                // store.dispatch({
                //     type: 'WATCHLIST',
                //     data: resp
                // });
            },
            error: (resp) => {
                console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    add_link(sid,imdb,data){
        console.log("saving link",data);
        let URL = "http://localhost:8080/api/movie/"+imdb+"/link";
        let data1 = {
            link: data
        };
        console.log("url", URL);
        $.ajax(URL, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data1),
            success: (resp) => {
                console.log("sucess", resp);
                this.seller_movie_link(sid,imdb);
            },
            error: (resp) => {
                console.log("error", resp);
                // store.dispatch({
                //     type: 'CLEAR_REGISTER_FORM',
                // })
            },
        });
    }

    seller_movie_link(sid,imdb){
        let URL = "http://localhost:8080/api/seller/"+sid+"/movie/"+imdb;
        console.log("url", URL);
        $.ajax(URL, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
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

export default new TheServer();
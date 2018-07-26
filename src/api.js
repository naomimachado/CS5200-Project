import store from './store';
import $ from 'jquery';

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

    submit_registration(data){
            $.ajax("http://localhost:8080/api/user", {
                method: "post",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                data: JSON.stringify(data),
                success: (resp) => {
                    console.log("sucess", resp);
                },
                error: (resp) => {
                    console.log("error", resp);
                    store.dispatch({
                        type: 'CLEAR_REGISTER_FORM',
                    })
                },
            });
    }
}

export default new TheServer();
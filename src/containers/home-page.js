import React from 'react';


class Page extends React.Component{
    render(){
        return (
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        TODO add nav stuff
                    </li>
                </ul>
                <form>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for movies and TV shows" />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                    </div>
                </form>
            </div>)
    }
}

export default Page;
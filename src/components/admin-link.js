import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import api from '../api';
import ViewLink from './view-link';

export default function AdminLinks(props){
    console.log("link props", props.props.link);
    
    function deleteLink() {
        api.delete_link(props.props.link.id);
    }
    
    function edit() {
        api.get_link(props.props.link.id);
    }
    
    return <div>
        <ViewLink params={props}/>
        <div>
            <Link to={"/system/link/edit"}>
                <Button onClick={edit}>Edit Link</Button>
            </Link>
        </div>
        <div>
            <Link to={"/system"}>
                <Button onClick={deleteLink}>Delete Link</Button>
            </Link>
        </div>
    </div>;
}
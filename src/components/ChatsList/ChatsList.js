import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

import './ChatsList.css';


class ChatsList extends Component {
    render() {
        let routes = null;
        if (this.props.isAuthenticated) {
            routes =  (
                <ul className="ChatsList">
                    <li className="Chat">
                        <Link to="/chat1">Chat1</Link>
                    </li>
                    <li className="Chat">
                        <Link to="/chat2">Chat2</Link>
                    </li>
                </ul>
            );
        }
        return routes;
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

export default connect(mapStateToProps)(ChatsList);
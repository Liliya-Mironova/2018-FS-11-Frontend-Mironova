import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import Chat from '../src/components/Chat/Chat.js';
import ChatsList from '../src/components/ChatsList/ChatsList.js';
import Header from '../src/components/Header/Header.js';
import Auth from '../src/containers/Auth/Auth.js';
import {connect} from 'react-redux';
import * as actions from './store/actions';


class App extends Component {
    componentDidMount() {
        this.props.checkToken();
    }

    render() {
        let route = (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={ChatsList} />
                    <Route path="/login" component={Auth} />
                </Switch>
            </div>
        );
        if (this.props.token) {
            route = (
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={ChatsList} />
                        <Route path="/login" component={Auth} />
                        <Route path="/chat1" component={Chat} />
                        <Route path="/chat2" component={Chat} />
                    </Switch>
                </div>
            );
        }
        return (
            <Router>
                {route}
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        checkToken: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

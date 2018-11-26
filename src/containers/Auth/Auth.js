import React, {Component} from 'react';

import './Auth.css';
import Input from '../../components/Input/input'


class Auth extends Component {
    state = {
        loginForm: {
            login: {
                elementType: 'input',
                value: '',
                placeholder: 'Login'
            },
            password: {
                elementType: 'input',
                value: '',
                placeholder: 'Password'
            }
        }
    };
 
    handleInput = (event, key) => {
        const newFormData = {
            ...this.state.loginForm
        };
        const inputData = {
            ...this.state.loginForm[key],
        }
        inputData.value = event.target.value;
        this.setState( {
            loginForm: newFormData
        });
    };

    render() {
        const inputs = Object.keys(this.state.loginForm).map(key => {
                const element = this.state.loginForm[key];
                return <Input key={key}
                              elementType={element.elementType}
                              changed={(event) => this.handleInput(event, key)}
                              placeholder={element.placeholder} />
            });
        return (
            <div>
                {inputs}
            </div>
        )
    }
}

export default Auth;
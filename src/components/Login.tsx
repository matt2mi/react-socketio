import * as React from 'react';
import {subscribeToApp} from '../helpers/api';
import MyLinkButton from "./MyLinkButton";

export default class Login extends React.Component {

    state = {
        pseudo: '',
        connected: false,
        welcomeMessage: ''
    };

    constructor(props: any) {
        super(props);
        this.login = this.login.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue = (event: any) => {
        this.setState({
            ...this.state,
            pseudo: event.target.value
        });
    }

    login = (event: React.FormEvent<HTMLFormElement>, history: any) => {
        console.warn('logging', this.state.pseudo);
        subscribeToApp((err: string, connected: boolean, welcomeMessage: string) => this.setState({
                ...this.state,
                connected,
                welcomeMessage
            }),
            this.state.pseudo);
        history.push('/waiting');
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row pt-3 justify-content-center">
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>
                        <div className="card-block">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Pseudo</label>
                                    <input type="text" className="form-control" onChange={this.changeValue}/>
                                </div>
                                <MyLinkButton cb={this.login}/>
                            </form>
                            <br/>
                            <p>{this.state.welcomeMessage}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
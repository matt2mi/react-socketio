import * as React from 'react';
import {SyntheticEvent} from 'react';
import {subscribeToApp} from '../helpers/api';
import MyButton from './MyLinkButton';
import {History} from 'history';

interface Props {
}

interface State {
    readonly pseudo: string;
    readonly connected: boolean;
    readonly welcomeMessage: string;
}

export default class Login extends React.Component<Props, State> {

    changeValue = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            pseudo: event.currentTarget.value
        });
    }

    login = (event: SyntheticEvent<HTMLButtonElement>, history: History) => {
        event.preventDefault();
        console.warn('logging', this.state.pseudo);
        subscribeToApp(
            (err: string, connected: boolean, welcomeMessage: string) => {
                this.setState({
                    connected,
                    welcomeMessage
                });
                console.warn(welcomeMessage);
                history.push('/waiting');
            },
            this.state.pseudo
        );
    }

    constructor(props: Props) {
        super(props);

        this.state = {
            pseudo: '',
            connected: false,
            welcomeMessage: ''
        };

        this.login = this.login.bind(this);
        this.changeValue = this.changeValue.bind(this);
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
                                    <label>Pseudo</label>
                                    <input type="text" className="form-control" onChange={this.changeValue}/>
                                </div>
                                <MyButton cb={this.login} type={'submit'}>Login</MyButton>
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
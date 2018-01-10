import * as React from 'react';
import {getSocket} from '../helpers/io-api';
import Socket = SocketIOClient.Socket;

interface Player {
    id: number;
    pseudo: string;
}

interface Props {
}

interface State {
    readonly players: Player[];
}

export default class WaitingPlayers extends React.Component<Props, State> {
    socket: Socket;

    onNewPlayer(result: { pseudo: string }) {
        const newPlayers: Player[] = this.state.players;
        newPlayers.push({
            id: this.state.players.length,
            pseudo: result.pseudo
        });
        this.setState({players: newPlayers});
    }

    getPlayers(players: string[]) {
        this.setState((prevState: State) => {
            return {
                players: players.map((player: string) => {
                    return { id: prevState.players.length, pseudo: player };
                })
            };
        });
    }

    constructor(props: Props) {
        super(props);
        this.onNewPlayer = this.onNewPlayer.bind(this);
        this.getPlayers = this.getPlayers.bind(this);

        this.socket = getSocket();
        this.state = {players: []};
        this.socket.on('newPlayer', this.onNewPlayer);
    }

    componentWillMount () {
        fetch('/players')
            .then(result => result.json())
            .then((players: string[]) => {
                this.getPlayers(players);
            })
            .catch(e => console.error(e));
    }

    render() {
        return (
            <div>
                <div className="row">Waiting other players...</div>
                <div className="row">
                    {this.state.players.length}/8 players
                </div>
                {this.state.players.map(player => {
                    return (<div className="row" key={player.id}>{player.pseudo}</div>);
                })}
            </div>
        );
    }
}

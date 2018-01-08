import * as React from 'react';
import {Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';

interface Props {
    cb: () => void
}

export default class MyLinkButton extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }
    
    // TODO get cb from Login to call it on click
    render() {
        return withRouter(({history}) => (
            <Button color="primary" onClick={() => this.props.cb(history)}>
                Login
            </Button>
        ))
    }
}

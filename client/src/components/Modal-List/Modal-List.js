import React, { Component } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default class ModalList extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: []
        }
    }

    componentDidMount(){
        axios
            .get(this.props.serverURL)
            .then((response) => {
                this.setState({
                    details: response.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render(){
        var items = [];
        for(let item of this.state.details){
            items.push(
                <div>
                <ListGroup.Item key={item}
                    main={item.main}
                    subtext={item.subtext}>
                    <button>{this.props.saveProperty}</button>
                </ListGroup.Item>
                </div>
            )
        }
        return(
            <div>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {items}
                        </ListGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button>{this.props.task}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}
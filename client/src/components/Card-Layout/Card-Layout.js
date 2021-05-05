import {CardColumns} from 'react-bootstrap'
import React, { Component } from "react"
import Card from '../Card/Card';
import axios from 'axios';
//import Navbar from '../../components/Navbar/navbar';
import './Card-Layout.scss'
import './Card-Layout.css'


export default class CardLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            details: []
        }
    }

    componentDidMount(){
        console.log(this.props);
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
                <Card key={item}
                    src={item.image}
                    main={item.main}
                    subtext={item.subtext}
                    />)
        }

        return (
            <div>
                {items.length>0 && (
                <div>
                <div className='heading'>
                    {this.props.heading}
                </div>
                <div className='subheading'>
                    {this.props.subheading}
                </div>
                <br /><br />
                <CardColumns>
                    {items}
                </CardColumns>
                </div>)}
            </div>
        )
    }
}
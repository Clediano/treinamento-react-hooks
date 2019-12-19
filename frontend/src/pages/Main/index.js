import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newBox: ''
        }
    }


    handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('boxes', {
            title: this.state.newBox
        });

        this.props.history.push(`/box/${response.data._id}`);
    }

    handleInputChange = e => {
        this.setState({ newBox: e.target.value });
    }

    render() {
        return (
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="Logo da aplicação" />
                    <input
                        placeholder="Criar um box"
                        value={this.state.newBox}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Criar</button>
                </form>
            </div>
        );
    }
}

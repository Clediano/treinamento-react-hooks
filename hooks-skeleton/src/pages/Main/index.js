import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Main() {
    const history = useHistory();
    const [newBox, setNewBox] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const box = await api.post('boxes', {
            title: newBox
        });
        history.push(`/box/${box.data._id}`);
    }

    return (
        <div id="main-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo da aplicação" />
                <input
                    placeholder="Criar um box"
                    value={newBox}
                    onChange={e => setNewBox(e.target.value)}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
}

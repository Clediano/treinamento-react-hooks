import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Main() {
    const history = useHistory();
    const [newBox, setNewBox] = useState('');
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        const fetchBoxes = async () => {
            const boxes = await api.get('boxes');
            setBoxes(boxes.data);
        }
        fetchBoxes();
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        const box = await api.post('boxes', {
            title: newBox
        });
        history.push(`/box/${box.data._id}`);
    }

    function handleSelectBox(box) {
        history.push(`/box/${box._id}`);
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
            <div id="list-container">
                {boxes && boxes.map(box => (
                    <div onClick={() => handleSelectBox(box)} key={box._id}>
                        <span>{box.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import useFetchBox from '../../components/useFetchBox';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import socket from 'socket.io-client';
import DropZone from 'react-dropzone';

import moment from 'moment';
import 'moment/locale/pt-br';

import { MdInsertDriveFile } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';
import logo from '../../assets/logo.svg';

import './styles.css';

export default function Box() {
    const { id } = useParams();
    const [lastFile, setLastFile] = useState({});
    const state = useFetchBox(id, lastFile);
    const history = useHistory();

    useEffect(() => {
        subscribeToNewFiles();
    }, []);

    function subscribeToNewFiles() {
        const io = socket('https://backend-box.herokuapp.com');
        io.emit('connectRoom', id);
        io.on('file', data => setLastFile(data));
    }

    function handleUpload(files) {
        files.forEach(file => {
            const formData = new FormData();
            formData.append('file', file);
            api.post(`boxes/${id}/files`, formData);
        });
    }

    const { data, isLoading, isError } = state;
    return (
        <div id="box-container">
            <span onClick={() => history.push('/')}>
                <FaArrowLeft size={24} />
            </span>
            <header>
                <img src={logo} alt="Logo da aplicação" />
                <h1>{data && data.title}</h1>
            </header>

            <DropZone onDropAccepted={handleUpload}>
                {({ getRootProps, getInputProps }) => (
                    <div className="upload" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Arraste arquivos ou clique aqui</p>
                    </div>
                )}
            </DropZone>

            {isError && <div id="feedback">Ops, alguma coisa deu errado...</div>}

            {isLoading ? (
                <div id="feedback">Loading...</div>
            ) : (
                    <ul>
                        {data && data.files.map(file => (
                            <li key={file._id}>
                                <a className="fileInfo" href={file.url} target="_blank" rel="noopener noreferrer">
                                    <MdInsertDriveFile size={24} color="#A5CFFF" />
                                    <strong>{file.title}</strong>
                                </a>
                                <span>{moment(file.createdAt).locale('pt-br').fromNow()}</span>
                            </li>
                        ))}
                    </ul>
                )}
        </div>
    )
}

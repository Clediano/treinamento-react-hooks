import React, { Component } from 'react';

import api from '../../services/api';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DropZone from 'react-dropzone';
import socket from 'socket.io-client';

import { MdInsertDriveFile } from 'react-icons/md';
import logo from '../../assets/logo.svg';

import './styles.css';

export default class Box extends Component {

    constructor(props) {
        super(props);

        this.state = {
            box: {}
        }
    }

    async componentDidMount() {

        this.subscribeToNewFiles();

        const { id } = this.props.match.params;
        const response = await api.get(`boxes/${id}`)

        this.setState({ box: response.data });
    }

    subscribeToNewFiles = () => {
        const { id } = this.props.match.params;
        const io = socket('https://omnistack-backend.herokuapp.com');

        io.emit('connectRoom', id);
        io.on('file', data => {
            this.setState({
                box: {
                    ...this.state.box,
                    files: [
                        data,
                        ...this.state.box.files,
                    ]
                }
            })
        })
    }

    handleUpload = (files) => {
        files.forEach(file => {
            const formData = new FormData();
            const { id } = this.props.match.params;

            formData.append('file', file);

            api.post(`boxes/${id}/files`, formData);
        });
    }

    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={logo} alt="Logo da aplicação" />
                    <h1>{this.state.box.title}</h1>
                </header>

                <DropZone onDropAccepted={this.handleUpload}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Arraste arquivos ou clique aqui</p>
                        </div>
                    )}
                </DropZone>

                <ul>
                    {this.state.box.files && this.state.box.files.map(file => (
                        <li key={file._id}>
                            <a className="fileInfo" href={file.url} target="_blank">
                                <MdInsertDriveFile size={24} color="#A5CFFF" />
                                <strong>{file.title}</strong>
                            </a>

                            <span>{'há ' + distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

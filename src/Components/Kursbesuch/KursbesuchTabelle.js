/* eslint-disable react-hooks/rules-of-hooks */
import Card from 'react-bootstrap/Card';
import React from "react";
import { useEffect, useState  } from "react";
import axios from "axios";
import { Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

/* Bootstrap imports */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import {Pencil} from 'react-bootstrap-icons';
import {Trash} from 'react-bootstrap-icons';
import {PlusCircle} from 'react-bootstrap-icons';

function kursLernende(){
    const [name, setUser] = useState([]);
    const [name2, setUser2] = useState([]);

    useEffect(() => {
        getData();
    }, []);
      const getData = async () => {
        const res = await axios.get("https://nadia.dnet.ch/kurs_lernende/");
        setUser(res.data.data.is_null);
        setUser2(res.data.data.not_null);
    };


      function renderBody() {
    return (
        <main>
            {name.map((bob) => {
                return(
            <Card style={{ width: '20rem', margin: '10px', background: "#dbdad7"}}>
            <Card.Body key={bob.id_kurse_lernende}>
                <Card.Title>{bob.kursthema}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bob.startdatum} bis {bob.enddatum} </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Dauer in Kurstagen: {bob.dauer}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{bob.vorname} {bob.nachname}</Card.Subtitle>

                <Card.Text>
                {bob.inhalt}
                </Card.Text>
                <tr>                
                <th style={{width: '4rem'}}></th>
                <th> <Card.Link to={`/kursbesuche/add`}>Lernende hinzufügen</Card.Link></th>
                </tr>
            </Card.Body>
            </Card>
                );
                })}

                {name2.map((bob) => {
                return(
            <Card style={{ width: '20rem', margin: '10px'}}>
            <Card.Body key={bob.id_kurse_lernende}>
                <Card.Title>{bob.kursthema}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{bob.startdatum} bis {bob.enddatum} </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Dauer in Kurstagen: {bob.dauer}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{bob.vorname} {bob.nachname}</Card.Subtitle>

                <Card.Text>
                {bob.inhalt}
                </Card.Text>
                <tr>                
                <th style={{width: '4rem'}}></th>
                <th> <Card.Link href="#">Lernende bearbeiten</Card.Link></th>
                </tr>
            </Card.Body>
            </Card>
                );
                })}
        </main>
    );
}

    return(<main>              
            {renderBody()}
        </main>
    );    

}

export default kursLernende;
// export default TextExample;
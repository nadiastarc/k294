import React from "react";
import { useState, useEffect } from "react";
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
import {ListCheck} from 'react-bootstrap-icons';
import {PlusCircle} from 'react-bootstrap-icons';

function LehrbetriebeTable() {
      
    /* State für geladenen lehrbetriebe*/  
    const [lehrbetriebe, setLehrbetriebe] = useState([]);
    
    /* Modal states & handler */
    const [modalID, setModalID] = useState("");
    const [show, setShow] = useState(false);
    const handleShow = (showValue) => setShow(showValue);
    
    /* Error/Success state & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler */
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);
    
    /* Beim aufrufen der Seite wird die Funktion zum laden der Daten aufgerufen */
    useEffect(() => {
        getData();
    }, []);
    
    /* Hier werden alle Lehrbetriebe von der API geladen. Der API-Call wird asynchron ausgeführt */
    const getData = async () => {
        const res = await axios.get("https://nadia.dnet.ch/lehrbetriebe/");
        setLehrbetriebe(res.data.data);
    };

    /* Hier wird der Header der Tabelle vorbereitet */
    function renderHeader(){
        return (
            <thead> 
                <tr>
                    <th>Id</th>
                    <th>Firma</th>
                    <th>Strasse</th>
                    <th>PLZ</th>
                    <th>Ort</th>
                    <th>Lernende</th>
                    <th>Bearbeiten</th>
                    <th>Löschen</th>
                </tr>
            </thead>);
    }
    
    /* Hier wird der Body der Tabelle vorbereitet */
    function renderBody() {
        return(
            <tbody>
            {lehrbetriebe.map((row) => {
                return(
                <tr key={row.id}>
                    <td style={{ padding: '10px'}}>{row.id}</td>
                    <td style={{ padding: '10px'}}>{row.firma}</td>
                    <td style={{ padding: '10px'}}>{row.strasse}</td>
                    <td style={{ padding: '10px'}}>{row.plz}</td>
                    <td style={{ padding: '10px'}}>{row.ort}</td>
                    <td><Link className="btn btn-dark" to={`/lehrbetrieb/show/${row.id_lehrbetrieb}`}><ListCheck color="white" size={15} /></Link></td>
                    <td><Link className="btn btn-info" to={`/lehrbetrieb/edit/${row.id_lehrbetrieb}`}><Pencil color="white" size={15} /></Link></td>
                    <td><Button onClick={() => openModal(row.id_lehrbetrieb)} className="btn btn-danger" ><Trash color="white" size={15}/></Button></td>        
                </tr>);
            })}
            </tbody>
        ); 
    }
    
    /* Hier wird der Header und der Body der Tabelle zusammen vorbereitet */
    function renderTable() {
        return(<Table striped borderless hover>
                {renderHeader()}                
                {renderBody()}
        </Table>);    
    }
    
    /* Diese funktion öffnet ein popup*/
    function openModal(id){
        console.log(id);
        setModalID(id);
        handleShow(true);
    }
    
    /* Hier wird der Lehrbetrieb gelöscht. Der API-Call wird asynchron ausgeführt */
    const deleteData = async () => {
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        /* Fehler abfangen */
        try {
            const response = await axios.delete("https://nadia.dnet.ch/lehrbetriebe/" + modalID);
            console.log(modalID)
            removeDataFromList();
            handleShowSuccess(true);
        }catch(err){
            handleShowError(true);
        }
        handleShow(false);
        handleLoading(false);
    };
    
    /* Der gelöschte lehrbetriebe wird aus dem state array entfernt*/
    const removeDataFromList = () => {
        setLehrbetriebe(current =>
            current.filter(dozent => {
              return dozent.id !== modalID;
            }),
        );
        setModalID("");
    }; 
    
    /* Hier wird das popup vorbereitet */
    function renderModal(){
        return(<Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Lehrbetrieb löschen</Modal.Title>
            </Modal.Header>
            <Modal.Body>Wollen Sie den ausgewählten Lehrbetrieb wirklich löschen?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleShow(false)}>
                Abbrechen
              </Button>
              <Button variant="danger" onClick={() => deleteData()}>
                Löschen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
              </Button>
            </Modal.Footer>
        </Modal>);
    }
    
    /* Rendering Tabelle + Popup*/
    return(
        <div>
            <h1>Lehrbetriebe Dashboard <Link className="btn btn-primary" to={`/lehrbetriebe/add`}>Lehrbetrieb erfassen <PlusCircle color="white" size={15} /></Link></h1>
            <Alert show={showSuccess} variant="success">
                <p>
                 Lehrbetrieb wurde erfolgreich entfernt.
                </p>
            </Alert>
            <Alert show={showError} variant="danger">
                <p>
                  Ein Fehler ist aufgetreten.
                </p>
            </Alert>
            {renderTable()}
            {renderModal()}
        </div>
    );
}

export default LehrbetriebeTable;
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

/* Bootstrap imports */
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import {Pencil} from 'react-bootstrap-icons';
import {Trash} from 'react-bootstrap-icons';
import {PlusCircle} from 'react-bootstrap-icons';

function KurseShowForm() {
    
    /* Hier wird die ID in der URL in einer Variable gespeichert */
    const params = useParams();
    let id = params.id;
    console.log(params);
      
    const [kurse, setKurse] = useState([]);
    
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
    
    /* Hier werden die Daten des Kurses von der API geladen. Der API-Call wird asynchron ausgeführt */
    const getData = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://nadia.dnet.ch/lehrbetrieb_lernende/" + id);
            setKurse(res.data.data);
        }catch(err){
            handleShowError(true);
        }  
    };

    /* Rendering des Formulars */
    function renderHeader(){
        return (
            <thead> 
                <tr>
                    <th>Id</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Start der Lehre</th>
                    <th>Ende der Lehre</th>
                    <th>Beruf</th>
                    <th>Start/Ende/Beruf Hinzufügen</th>
                    <th>Löschen</th>
                </tr>
            </thead>);
    }
    
    /* Hier wird der Body der Tabelle vorbereitet */
    function renderBody() {
        console.log(kurse);
        return(
            <tbody>
            {kurse.map((row) => {
                return(
                <tr key={row.ll_id}>
                    <td style={{ padding: '10px'}}>{row.ll_id}</td>
                    <td style={{ padding: '10px'}}>{row.vorname}</td>
                    <td style={{ padding: '10px'}}>{row.nachname}</td>
                    <td style={{ padding: '10px'}}>{row.start}</td>
                    <td style={{ padding: '10px'}}>{row.ende}</td>
                    <td style={{ padding: '10px'}}>{row.beruf}</td>
                    <td><Link className="btn btn-info" to={`/lehrbetrieb/show/AddStartEndBeruf/${row.ll_id}`}><Pencil color="white" size={15} /></Link></td>
                    <td><Button onClick={() => openModal(row.ll_id)} className="btn btn-danger" ><Trash color="white" size={15}/></Button></td>        
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
    
    /* Hier wird der Kurs gelöscht. Der API-Call wird asynchron ausgeführt */
    const deleteData = async () => {
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        /* Fehler abfangen */
        try {
            const response = await axios.delete("https://nadia.dnet.ch/lehrbetrieb_lernende/" + modalID);
            console.log("modalId: " + modalID)
            removeDataFromList();
            handleShowSuccess(true);
        }catch(err){
            handleShowError(true);
        }
        handleShow(false);
        handleLoading(false);
    };
    
    /* Der gelöschte Kurse wird aus dem state array entfernt*/
    const removeDataFromList = () => {
        setKurse(current =>
            current.filter(kurs => {
              return kurs.id !== modalID;
            }),
        );
        setModalID("");
    }; 
    
    /* Hier wird das popup vorbereitet */
    function renderModal(){
        return(<Modal show={show} onHide={() => handleShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Lernenden entfernen</Modal.Title>
            </Modal.Header>
            <Modal.Body>Wollen Sie den ausgewählten Lernenden wirklich entfernen?</Modal.Body>
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
            <h1>Lernende in diesem Lehrbetrieb<Link className="btn btn-primary" to={`LehrbetriebLernenderAdd/`}>Lernende Hinzufügen <PlusCircle color="white" size={15} /></Link></h1>
            <Alert show={showSuccess} variant="success">
                <p>
                 Lernede/r wurde erfolgreich entfernt.
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

export default KurseShowForm;
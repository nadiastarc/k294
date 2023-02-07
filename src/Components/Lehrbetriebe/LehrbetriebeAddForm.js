import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function LehrbetriebAddForm() {
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler*/
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);

    /* Bei Veränderungen bei einem Textfeld werden die Daten im state gespeichert */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    };

    /* Submit Listener */
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        createData();
    };
    
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */
    const createData = async () => {
        const json = JSON.stringify(inputs);
        /* Headers werden gesetzt */
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        /* Fehler abfangen */
        try{
            const response = await axios.post("https://nadia.dnet.ch/lehrbetriebe/?", json, config);
            handleShowSuccess(true);
            setInputs([]);
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };

    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Lehrbetriebe wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lehrbetriebe hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3" controlId="formLehrbetriebeNr">
                <Form.Label>Lehrbetrieb Nr.</Form.Label>
                <Form.Control required name="id_lehrbetrieb" type="number" placeholder="lehrbetrieb Nr." onChange={handleChange}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formLehrbetriebFirma">
                <Form.Label>Firma</Form.Label>
                <Form.Control required name="firma" type="text" placeholder="Firma" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLehrbetriebStrasse">
                <Form.Label>Strasse</Form.Label>
                <Form.Control required name="strasse" type="text"  placeholder="Strasse" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLehrbetriebPlz">
                <Form.Label>Plz</Form.Label>
                <Form.Control required type="text" name="plz" placeholder="PLZ" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLehrbetriebOrt">
                <Form.Label>Ort</Form.Label>
                <Form.Control required type="text" name="ort" placeholder="Ort" onChange={handleChange}/>
            </Form.Group>
           
            
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LehrbetriebAddForm;

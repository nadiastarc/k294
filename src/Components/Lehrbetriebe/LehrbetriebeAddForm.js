import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function LehrbetriebAddForm() {
    let lernendeID =[];
    /* Input state*/  
    const [inputs, setInputs] = useState([]);

    const [lernendeValues, setLernendeValues] = useState([]); 
    const [LehrbetriebIdValue, setLehrbetriebeValues] = useState([]); 
    
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
        addLernende();
    };

    const handleChangeLernende = (selectedOptions) => {
        lernendeID = [];
        for (let i = 0; i<selectedOptions.length; i++)
        {
            lernendeID.push(selectedOptions[i]);
        }
        console.log(selectedOptions[0].value);
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
            console.log("error vom adden:" + response);
            handleShowSuccess(true);
            setInputs([]);
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };
        const addLernende = async () => {
        console.log('Lernende');
        let LehrbetriebID = LehrbetriebIdValue;
        console.log('Lernende' +lernendeID);
        console.log(LehrbetriebIdValue);
        for (let i = 0; i < lernendeID.length; i++)
        {
            console.log(lernendeID[i])
            //console.log(inputsLernende)
            let json = {
                'id_lehrbetrieb': Math.floor(LehrbetriebID),
                'id_lernende': Math.floor(lernendeID[i].value),
            };
            console.log(json)
            /* Headers werden gesetzt */
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            /* Fehler abfangen */
            try{
                const response = await axios.post("https://nadia.dnet.ch/lehrbetrieb_lernende/", json, config);
                handleShowSuccess(true);
            }catch(err){
                handleShowError(true);
            }
            handleLoading(false);
        }
    };

    const getLernende = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://nadia.dnet.ch/lernende/");
            //console.log(res);
            setLernendeValues(res.data.data);
        }catch(err){
            handleShowError(true);
        }  
    };
    const getLehrbetriebID = async () => {
        /* Fehler abfangen */
        try{
            const res = await axios.get("https://nadia.dnet.ch/lehrbetriebe");
            let ID = res.data.increment[0].AUTO_INCREMENT;
            setLehrbetriebeValues(ID)
            return ID 
        }catch(err){
            handleShowError(true);
        }
    };

    useEffect(() => {
        getLernende();
        getLehrbetriebID();
    }, []);

    function Item(value, label) {    
        this.value = value;    
        this.label = label;    
    } 

    let optionsLernende = []    
    for (let i = 0; i < lernendeValues.length; i++) 
    {   
        optionsLernende.push(new Item(lernendeValues[i].id_lernende, lernendeValues[i].vorname + " " +  lernendeValues[i].nachname))   
    }
    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Lehrbetrieb wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lehrbetrieb hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="fromLehrbetriebFirma">
                <Form.Label>Betrieb</Form.Label>
                <Form.Control required name="firma" type="text" placeholder="Betrieb" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLehrbetriebStrasse">
                <Form.Label>Strasse</Form.Label>
                <Form.Control  name="strasse" type="text" placeholder="Strasse" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fromLehrbetriebPLZ">
                <Form.Label>PLZ</Form.Label>
                <Form.Control  name="plz" type="text" placeholder="PLZ" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLehrbetriebenOrt">
                <Form.Label>Ort</Form.Label>
                <Form.Control  type="text" name="ort" placeholder="Ort" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Lernende</Form.Label>  <br></br>      
                <Select options={optionsLernende} isSearchable={true} isMulti menuPlacement="top" onChange={handleChangeLernende}/>     
            </Form.Group><br></br>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LehrbetriebAddForm;
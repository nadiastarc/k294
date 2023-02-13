import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select';


function LernendeEditForm() {
    
    /* Hier wird die ID in der URL in einer Variable gespeichert */
    const params = useParams();
    let id_lernende = params.id;
      
    /* State für die vorhandenen Werte der jeweiligen Felder */  
    const [loadedValues, setLoadedValues] = useState([]);  
    const [Land, setDozentValues] = useState([]);

    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    
    /* Error/Success states & handler */
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
            const res = await axios.get("https://nadia.dnet.ch/lernende/" + id_lernende);
            setLoadedValues(res.data.data[0]);
        }catch(err){
            handleShowError(true);
        }  
    };
    
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
        updateData();
    };
    useEffect(() => {
        getDozent();
    }, []);
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */
    const updateData = async () => {
        const json = JSON.stringify(inputs);
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try{
            const response = await axios.put("https://nadia.dnet.ch/lernende/" + id_lernende, json, config);
            handleShowSuccess(true);
            setInputs([]); 
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    };
    function Item(value, label) {
        this.value = value;
        this.label = label;
    }
    let options = []
    for (let i = 0; i < Land.length; i++){
        options.push(new Item(Land[i].id_land, [Land[i].land]))
    }
    const getDozent = async () => {
        /* Fehler abfangen */
        try{const res = await axios.get("https://nadia.dnet.ch/laender/");
        //console.log(res);            
        setDozentValues(res.data.data);}
        catch(err){
            handleShowError(true);
        }
    };
    const handleChangeSelect = (selectedOptions) => {
        console.log(selectedOptions)
        console.log(selectedOptions.value);
        setInputs(values => ({...values, "id_land": selectedOptions.value}))
        // this.state.selectValue({ selectedOptions });         
    }
    /* Rendering des Formulars */
    return (
        <div>
        <Alert show={showSuccess} variant="success">
            <p>
              Lernender wurde erfolgreich aktualisiert.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lernendendaten bearbeiten</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLernenderNr">
                <Form.Label>Lernender Nr.</Form.Label>
                <Form.Control name="id_lernende" type="number" placeholder="Lernender Nr." defaultValue={loadedValues.id_lernende} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderVorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control name="vorname" type="text" placeholder="vorname" defaultValue={loadedValues.vorname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderNachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control name="nachname" type="text" placeholder="nachname" defaultValue={loadedValues.nachname} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderStrasse">
                <Form.Label>Strasse</Form.Label>
                <Form.Control name="strasse" type="text" placeholder="strasse" defaultValue={loadedValues.strasse} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderPlz">
                <Form.Label>Plz</Form.Label>
                <Form.Control type="text" name="plz" placeholder="plz" defaultValue={loadedValues.plz} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderOrt">
                <Form.Label>Ort</Form.Label>
                <Form.Control type="text" name="ort" placeholder="ort" defaultValue={loadedValues.ort} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderLand">
                <Form.Label>Land</Form.Label>
                <Select name="selectLand" options={options} isSearchable={true}  menuPlacement="top" onChange={handleChangeSelect} />
                {/* <Form.Control type="number" name="nr_land" placeholder="nr_land" defaultValue={loadedValues.nr_land} onChange={handleChange}/> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderGeschlecht">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control type="text" name="geschlecht" placeholder="geschlecht" defaultValue={loadedValues.geschlecht} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderTelefon">
                <Form.Label>Telefon</Form.Label>
                <Form.Control type="text" name="telefon" placeholder="telefon" defaultValue={loadedValues.telefon} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderHandy">
                <Form.Label>Handy</Form.Label>
                <Form.Control type="text" name="handy" placeholder="handy" defaultValue={loadedValues.handy} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderEmailPriv">
                <Form.Label>E-Mail Privat</Form.Label>
                <Form.Control type="text" name="email_privat" placeholder="email_privat" defaultValue={loadedValues.email_privat} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderEmail">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control type="text" name="email" placeholder="email" defaultValue={loadedValues.email} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernenderGeburtsdatum">
                <Form.Label>Geburtsdatum</Form.Label>
                <Form.Control type="text" name="geburtsdatum" placeholder="Geburtsdatum" defaultValue={loadedValues.geburtsdatum} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Speichern {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LernendeEditForm;

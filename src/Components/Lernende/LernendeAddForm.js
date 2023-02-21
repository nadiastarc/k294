import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Select from 'react-select';


/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function LernendenAddForm() {
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    const [Land, setLand] = useState([]);

    useEffect(() => {
        getLand();
      
    }, []);

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
            const response = await axios.post("https://nadia.dnet.ch/lernende/?", json, config);
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
        options.push(new Item(Land[i].id_land, [Land[i].land ]))
    }

    const getLand = async () => {
        /* Fehler abfangen */
        try{const res = await axios.get("https://nadia.dnet.ch/laender");
        //console.log(res);            
        setLand(res.data.data);}
        catch(err){
            handleShowError(true);
        }
    };

    const handleChangeSelect = (selectedOptions) => {
        console.log("SO:");
        console.log('selectedOptions1'+ selectedOptions)
        console.log(selectedOptions.value);
        setInputs(values => ({...values, "id_land": selectedOptions.value}))
        // this.state.selectValue({ selectedOptions });         
    }

    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Lernender wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lernender hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formLernendeVorname">
                <Form.Label>Vorname</Form.Label>
                <Form.Control  name="vorname" type="text" placeholder="Vorname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeNachname">
                <Form.Label>Nachname</Form.Label>
                <Form.Control  name="nachname" type="text" placeholder="Nachname" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeStrasse">
                <Form.Label>Strasse</Form.Label>
                <Form.Control  name="strasse" type="text"  placeholder="Strasse" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendePlz">
                <Form.Label>Plz</Form.Label>
                <Form.Control  type="text" name="plz" placeholder="PLZ" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeOrt">
                <Form.Label>Ort</Form.Label>
                <Form.Control  type="text" name="ort" placeholder="Ort" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeLandNr">
                <Form.Label>Land</Form.Label><br></br>
                <Select name="selectLand" options={options} isSearchable={true}  menuPlacement="top" onChange={handleChangeSelect} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeGeschlecht">
                <Form.Label>Geschlecht</Form.Label>
                <Form.Control  type="text" name="geschlecht" placeholder="Geschlecht" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeTelefon">
                <Form.Label>Telefon Nummer</Form.Label>
                <Form.Control  type="text" name="telefon" placeholder="Telefonnummer" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeHandy">
                <Form.Label>Handy Nummer</Form.Label>
                <Form.Control  type="text" name="handy" placeholder="Handynummer" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeEmail">
                <Form.Label>E-Mail</Form.Label>
                <Form.Control  type="email" name="email" placeholder="E-Mail" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeEmailPriv">
                <Form.Label>Private E-Mail</Form.Label>
                <Form.Control  type="email" name="email_privat" placeholder="Privat E-Mail" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLernendeGeburtsdatum">
                <Form.Label>Geburtstag</Form.Label>
                <Form.Control  type="date" name="geburtsdatum" placeholder="Geburtstag" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default LernendenAddForm;

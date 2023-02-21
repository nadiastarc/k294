import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select'
import { useParams } from 'react-router-dom';

/* Bootstrap imports */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

/* Diese Funtion gibt das Formular zum hinzufügen von Einträgen zurück*/
function KurseAddForm() {
    let lernendeID =[];
    let params = useParams();

    /* Input state*/  

    const [lernendeValues, setLernendeValues] = useState([]); 
    
    /* Error/Success states & handler */
    const [showSuccess, setShowSuccess] = useState(false);
    const handleShowSuccess = (showValue) => setShowSuccess(showValue);
    const [showError, setShowError] = useState(false);
    const handleShowError = (showValue) => setShowError(showValue);
    
    /* Loading state & handler*/
    const [loading, setLoading] = useState(false);
    const handleLoading = (loadingValue) => setLoading(loadingValue);

    /* Bei Veränderungen bei einem Textfeld werden die Daten im state gespeichert */

    const handleChangeLernende = (selectedOptions) => {
        lernendeID = [];
        for (let i = 0; i<selectedOptions.length; i++)
        {
            lernendeID.push(selectedOptions[i]);
        }
        //setInputsLernende(values => ({...values, "nr_lernende": selectedOptions.value}))
    };

    /* Submit Listener */
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        addLernende();
    };

    // Daten der verschiedenen Dozenten speichern
      function Item(value, label) {    
        this.value = value;    
        this.label = label;    
    } 

    let options2 = []
    
    for (let i = 0; i < lernendeValues.length; i++) 
    {   
        options2.push(new Item(lernendeValues[i].id, lernendeValues[i].vorname))   
    }
    /* Die Daten werden an die API geschickt. Der API-Call wird asynchron ausgeführt. */

    const addLernende = async () => {
        console.log('Lernende');
        console.log(lernendeID);
        let LehrbetriebID = params.id;
        for (let i = 0; i < lernendeID.length; i++)
        {
            console.log(lernendeID[i])
            let json = {
                'id_lehrbetrieb': LehrbetriebID,
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

    useEffect(() => {
        getLernende();
    }, []);

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


    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Lernender wurde erfolgreich hinzugefügt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Lernende Hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Lernende</Form.Label>        
                <Select options={options2} isSearchable={true} isMulti menuPlacement="top" onChange={handleChangeLernende}/>     
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default KurseAddForm;
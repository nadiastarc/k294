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
function KurseAddForm() {
    /* Input state*/  
    const [inputs, setInputs] = useState([]);
    const [Dozent, setDozentValues] = useState([]);


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
  useEffect(() => {
        getDozent();
    }, []);
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
            const response = await axios.post("https://nadia.dnet.ch/kurs/?", json, config);
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
    for (let i = 0; i < Dozent.length; i++){
        options.push(new Item(Dozent[i].id_dozent, [Dozent[i].vorname + " " + Dozent[i].nachname]))
    }
    const getDozent = async () => {
        /* Fehler abfangen */
        try{const res = await axios.get("https://nadia.dnet.ch/dozent");
        //console.log(res);            
        setDozentValues(res.data.data);}
        catch(err){
            handleShowError(true);
        }
    };
    const handleChangeSelect = (selectedOptions) => {
        console.log("SO:");
        console.log(selectedOptions)
        console.log(selectedOptions.value);
        setInputs(values => ({...values, "id_dozent": selectedOptions.value}))
        // this.state.selectValue({ selectedOptions });         
    }
    /* Rendering des Formulars */
    return (
        <div>    
        <Alert show={showSuccess} variant="success">
            <p>
              Kurs wurde erfolgreich erstellt.
            </p>
        </Alert>
        <Alert show={showError} variant="danger">
            <p>
              Ein Fehler ist aufgetreten.
            </p>
        </Alert>
        <h1>Kurs hinzufügen</h1>
        <Form className="mt-4" onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-3" controlId="formKursNummer">
                <Form.Label>Kursnummer</Form.Label>
                <Form.Control required name="kursnummer" type="number" placeholder="Kursnummer" onChange={handleChange}/>
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formKursThema">
                <Form.Label>Kursthema</Form.Label>
                <Form.Control required name="kursthema" type="text" placeholder="Kursthema" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursInhalt">
                <Form.Label>Kursinhalt</Form.Label>
                <Form.Control required name="inhalt" as="textarea" rows={3} placeholder="Kursinhalt" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDozent">
                <Form.Label>Dozent</Form.Label>
                <Select name="selectDozent" options={options} isSearchable={true}  menuPlacement="top" onChange={handleChangeSelect} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursStartdatum">
                <Form.Label>Startdatum</Form.Label>
                <Form.Control required type="date" name="startdatum" placeholder="Startdatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursEnddatum">
                <Form.Label>Enddatum</Form.Label>
                <Form.Control required type="date" name="enddatum" placeholder="Enddatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDauer">
                <Form.Label>Dauer</Form.Label>
                <Form.Control required type="number" name="dauer" placeholder="Dauer" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default KurseAddForm;

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
    const [lernendeValues, setLernendeValues] = useState([]); 
    const [KursIdValue, setKurseValues] = useState([]);


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
        getLernende();
        getKursID();
    }, []);
    /* Submit Listener */
    const handleSubmit = (event) => {
        event.preventDefault();
        handleLoading(true);
        handleShowError(false);
        handleShowSuccess(false);
        createData();
        addLernende();
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
    let optionsL = []
    for (let i = 0; i < lernendeValues.length; i++){
        optionsL.push(new Item(lernendeValues[i].id_lernende, [lernendeValues[i].vorname + " " + lernendeValues[i].nachname]))
    }
    const getLernende = async () => {
        /* Fehler abfangen */
        try{const res = await axios.get("https://nadia.dnet.ch/lernende");
        //console.log(res);            
        setLernendeValues(res.data.data);}
        catch(err){
            handleShowError(true);
        }
    };
    const handleChangeSelect = (selectedOptions) => {
        console.log("SO:");
        console.log('selectedOptions1'+ selectedOptions)
        console.log(selectedOptions.value);
        setInputs(values => ({...values, "id_dozent": selectedOptions.value}))
        // this.state.selectValue({ selectedOptions });         
    }
    let lernendeID =[];

    const handleChangeLernende = (selectedOptions) => {
        lernendeID = [];
        for (let i = 0; i<selectedOptions.length; i++)
        {
            lernendeID.push(selectedOptions[i]);
        }
        //setInputsLernende(values => ({...values, "nr_lernende": selectedOptions.value}))
        console.log('selectedOptions3 '+ selectedOptions);
    };

const addLernende = async () => {
    console.log('Lernende');
    console.log(lernendeID);
    let kursID = KursIdValue;
    console.log(KursIdValue);
    console.log("AFF"+lernendeID.length);
    for (let i = 0; i < lernendeID.length; i++)
    {
        console.log(lernendeID[i])
        //console.log(inputsLernende)
        let json = {
            'id_kurs': Math.floor(kursID),
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
            let response = await axios.post("https://nadia.dnet.ch/kurs_lernende/", json, config);
            handleShowSuccess(true);
        }catch(err){
            handleShowError(true);
        }
        handleLoading(false);
    }
};
const getKursID = async () => {
    /* Fehler abfangen */
    try{
        const res = await axios.get("https://nadia.dnet.ch/kurs");
        let ID = res.data.increment[0].AUTO_INCREMENT;

        console.log(ID);
        setKurseValues(ID)
        return ID 
    }catch(err){
        handleShowError(true);
        }
    };
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
        
            <Form.Group className="mb-3" controlId="formKursThema">
                <Form.Label>Kursthema</Form.Label>
                <Form.Control  name="kursthema" type="text" placeholder="Kursthema" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursNummer">
                <Form.Label>Modulnummer</Form.Label>
                <Form.Control required name="kursnummer" type="text" placeholder="Modulnummer" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursInhalt">
                <Form.Label>Kursinhalt</Form.Label>
                <Form.Control name="inhalt" as="textarea" rows={3} placeholder="Kursinhalt" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDozent">
                <Form.Label>Dozent</Form.Label><br></br>
                <Select name="selectDozent" options={options} isSearchable={true}  menuPlacement="top" onChange={handleChangeSelect} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursStartdatum">
                <Form.Label>Startdatum</Form.Label>
                <Form.Control type="date" name="startdatum" placeholder="Startdatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursEnddatum">
                <Form.Label>Enddatum</Form.Label>
                <Form.Control type="date" name="enddatum" placeholder="Enddatum" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursDauer">
                <Form.Label>Dauer</Form.Label>
                <Form.Control type="number" name="dauer" placeholder="Dauer" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formKursLernende">
                <Form.Label>Lernende</Form.Label><br></br>
                <Select name="selectLernende" options={optionsL} isSearchable={true} isMulti  menuPlacement="top" onChange={handleChangeLernende} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Erstellen {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>}
            </Button>
        </Form>
        </div>
    );
}

export default KurseAddForm;

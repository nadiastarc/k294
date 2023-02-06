import React from "react";
import { Link } from 'react-router-dom';

/* Bootstrap imports */
import Button from 'react-bootstrap/Button';
import {ArrowLeftCircleFill} from 'react-bootstrap-icons';

/* Diese Funktion gibt einen Back Button zurück. Als prop muss man die Route angeben.*/
function BackButton(props) {
    
    return(
        <div>
            <Link className="btn btn-link" to={props.route}> <ArrowLeftCircleFill size={15} /> Zurück</Link>
        </div>            
    );
}

export default BackButton;
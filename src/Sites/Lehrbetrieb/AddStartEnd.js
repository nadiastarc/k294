import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import AddStartEndBerufForm from '../../Components/Lehrbetriebe/AddStartEnd';


const AddStartEndBeruf = () => {
    return (
        <Container>
            <Row>
                <BackButton route="/lehrbetriebe/" />
                <Col lg={7} className="mt-5"><AddStartEndBerufForm /></Col>
            </Row>
        </Container>
    );
};

export default AddStartEndBeruf;


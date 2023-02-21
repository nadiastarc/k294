import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import ShowLernendeForm from '../../Components/Lehrbetriebe/ShowLernende';


const ShowLernende = () => {
    return (
        <Container>
            <Row>
                <BackButton route="/lehrbetrieb/" />
                <Col lg={7} className="mt-5"><ShowLernendeForm /></Col>
            </Row>
        </Container>
    );
};

export default ShowLernende;


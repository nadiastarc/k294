import React from 'react';
import BackButton from '../../Components/BackButton';
import LandAddForm from '../../Components/Land/LandAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DozentAdd = () => {
    return (
        <Container>
            <Row>
                <BackButton route="/laender/"/>
                <Col lg={7} className="mt-5"><LandAddForm /></Col>
            </Row>
        </Container>
    );
};

export default DozentAdd;



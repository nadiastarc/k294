import React from 'react';
import BackButton from '../../Components/BackButton';
import KurseAddForm from '../../Components/Kurs/KurseAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const KurseAdd = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/kurse/"/>
                <Col lg={7} className="mt-5"><KurseAddForm /></Col>
            </Row>
        </Container>
   );
};
  
export default KurseAdd;



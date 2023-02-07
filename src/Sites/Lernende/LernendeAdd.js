import React from 'react';
import BackButton from '../../Components/BackButton';
import LernendeAddForm from '../../Components/Lernende/LernendeAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const KurseAdd = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/lernende/"/>
                <Col lg={7} className="mt-5"><LernendeAddForm /></Col>
            </Row>
        </Container>
   );
};
  
export default KurseAdd;



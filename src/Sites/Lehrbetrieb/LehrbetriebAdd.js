import React from 'react';
import BackButton from '../../Components/BackButton';
import LehrbetriebAddForm from '../../Components/Lehrbetriebe/LehrbetriebeAddForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const KurseAdd = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/lehrbetrieb/"/>
                <Col lg={7} className="mt-5"><LehrbetriebAddForm /></Col>
            </Row>
        </Container>
   );
};
  
export default KurseAdd;



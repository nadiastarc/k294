import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LehrbetriebTable from '../../Components/Lehrbetriebe/LehrbetriebeTabelle'

const Kurse = () => {
  return (
        <Container>
            <Row>
                <Col className="mt-5"><LehrbetriebTable /></Col>
            </Row>
        </Container>
   );
};
  
export default Kurse;



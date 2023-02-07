import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DozentenTabelle from '../../Components/Dozenten/DozentenTabelle'

const Dozenten = () => {
  return (
        <Container>
            <Row>
                <Col className="mt-5"><DozentenTabelle /></Col>
            </Row>
        </Container>
   );
};
  
export default Dozenten;



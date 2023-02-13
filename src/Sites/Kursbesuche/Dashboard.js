import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import KurseBesuchTable from '../../Components/Kursbesuch/KursbesuchTabelle'

const KursBesuch = () => {
  return (
        <Container>
            <Row>
                <Col className="mt-5"><KurseBesuchTable /></Col>
            </Row>
        </Container>
   );
};
  
export default KursBesuch;



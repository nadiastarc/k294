import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import LernendeEditForm from '../../Components/Lernende/LernendeEditForm';


const KurseEdit = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/lernende/" />
                <Col lg={7} className="mt-5"><LernendeEditForm /></Col>
            </Row>
        </Container>
   );
};
  
export default KurseEdit;



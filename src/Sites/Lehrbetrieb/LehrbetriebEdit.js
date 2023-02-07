import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import LehrbetriebEditForm from '../../Components/Lehrbetriebe/LehrbetriebeEditForm';


const KurseEdit = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/lehrbetrieb/" />
                <Col lg={7} className="mt-5"><LehrbetriebEditForm /></Col>
            </Row>
        </Container>
   );
};
  
export default KurseEdit;



import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import BackButton from '../../Components/BackButton';
import LandEditForm from '../../Components/Land/LandEditForm';


const DozentenEdit = () => {
  return (
        <Container>
            <Row>
                <BackButton route="/laender/" />
                <Col lg={7} className="mt-5"><LandEditForm /></Col>
            </Row>
        </Container>
   );
};
  
export default DozentenEdit;



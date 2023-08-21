import React from 'react';
import { Alert, Col, Container, Row } from 'reactstrap'; // Import the responsive classes from Reactstrap

import zdjecieImage from './zdjecie1.jpg';

const ThankYou = () => (
  <Container>
    <Row className="justify-content-center">
      <Col xs={12} md={6} lg={8}> {/* Use Bootstrap grid classes to define the column layout */}
        <div className="d-flex justify-content-center align-items-center" style={{ borderRadius: '32px', boxShadow: '0px 6px 5px -5px rgba(0, 0, 0, 0.3)' }}>
          <img
            src={zdjecieImage}
            alt="Love to Music"
            className="img-fluid rounded shadow"
            width="700px"
            height="10px"
          />
        </div>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={12} md={6} xl={12}>
        <h2 className="text-center mt-1" style={{ marginBottom: '-5px' }}><strong>Your ticket has been booked successfully!</strong></h2>
        <h2 className="text-center mt-1"><strong>Please check your email!</strong></h2>
        <h5 className="text-center mt-1">
          <Alert color="info">
            <strong>Purchase summary details and payment link have been sent to your email. See you at the New Wave Festival!</strong>
          </Alert>
        </h5>
      </Col>
    </Row>
  </Container>
);

export default ThankYou;

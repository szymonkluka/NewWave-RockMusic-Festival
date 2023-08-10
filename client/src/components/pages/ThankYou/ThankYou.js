import { Alert, Container } from 'reactstrap';
import zdjecieImage from './zdjecie1.jpg';
const ThankYou = () => (

  <Container>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '32px', boxShadow: '0px 6px 5px -5px rgba(0, 0, 0, 0.3)' }}>
        <img
          src={zdjecieImage}
          alt="Love to Music"
          width="650"
          height="300"
          style={{ borderRadius: '32px', boxShadow: '10px 10px 10px -5px rgba(0, 0, 0, 0.3)' }}
        />
      </div>
    </div>
    <h2 style={{ display: 'flex', justifyContent: 'center' }}><strong>Your ticket has been booked successfully!</strong></h2>
    <h2 style={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}><strong>Please check your email!</strong></h2>
    <h5 style={{ display: 'flex', justifyContent: 'center' }}>
      <Alert color="info">
        <strong>Purchase summary details and payment link have been sent to your email. See you at the New Wave Festival ! </strong>
      </Alert>
    </h5>
  </Container>
);

export default ThankYou;
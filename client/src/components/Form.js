import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Form = ({ children }) => {
  return (
    <Container>
      <Row className='center'>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default Form
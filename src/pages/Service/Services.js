import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import RangeSlider from 'react-bootstrap-range-slider';


const Services = (props) => {

  const { notifications } = props

  return (
    <div className="painel">
      <Card.Header as="h4">Notificações</Card.Header>
      <div className="span11" style={{ overflow: 'auto' }}>
        <div className="row-fluid">
          {
            notifications.map(value => {
              console.log("🚀 ~ file: Services.js:33 ~ Services ~ value", value)
              return <div class="col-lg-3">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={value.header_image} />
                  <Card.Body>
                    <Card.Title>{value.name}</Card.Title>
                    <Card.Text>

                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Oferta de {value.discount_percent}%</ListGroup.Item>
                    <ListGroup.Item>De {value.initial_formatted} por {value.final_formatted}</ListGroup.Item>
                    <ListGroup.Item>Notificado:{value.date}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Services;
import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import RangeSlider from 'react-bootstrap-range-slider';
import customApi from '../api/customApi';


const Manager = (props) => {


  const [genres, setGenres] = React.useState([
    {
      "id": 23,
      "description": "Indie"
    },
    {
      "id": 28,
      "description": "Simulation"
    },
    {
      "id": 2,
      "description": "Strategy"
    },
    {
      "id": 4,
      "description": "Casual"
    },
    {
      "id": 18,
      "description": "Sports"
    },
    {
      "id": 70,
      "description": "Early Access"
    },
    {
      "id": 1,
      "description": "Action"
    },
    {
      "id": 25,
      "description": "Adventure"
    },
    {
      "id": 3,
      "description": "RPG"
    },
    {
      "id": 9,
      "description": "Racing"
    },
    {
      "id": 56,
      "description": "Software Training"
    }
  ])

  useEffect(() => {
    customApi.get('genres').then(res => {      
      console.log("🚀 ~ file: Manager.js:19 ~ customApi.get ~ res", res)
    })
  }, [genres])


  const { 
    sendMessage, 
    checked, 
    setChecked,   
    desconto,
    setDesconto,
    price,
    setPrice} = props

  const handleClick = (event) => {
    if (event.target.checked) {
      const array = checked
      array.push(event.target.value)
      setChecked(array)
      sendMessage(`${event.target.value}`)
    }
  }

  return (
    <div className="painel">
      <Card>
        <Card.Header as="h4">Gerenciamento de Notificações</Card.Header>
        <Card.Body>
          <Card.Header as="h5">Gêneros</Card.Header>
          <Card.Body>
            <Form>
              <Row>
                {
                  genres.map((value, i) => {
                    return (
                      <Col xs={2} key={i}>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label={value.description}
                          value={value.description}
                          defaultChecked={checked.includes(value.description) ? true : false}
                          onClick={handleClick}
                        />
                      </Col>
                    )
                  })
                }
              </Row>
            </Form>
          </Card.Body>

          <Card.Header as="h5">Ofertas</Card.Header>
          <Card.Body>
            <Row>
              <Col xs={2}>
                <Form.Label>Desconto</Form.Label>
              </Col>
              <Col xs={5}>
                <Form>
                  <RangeSlider
                    value={desconto}
                    onChange={e => setDesconto(e.target.value)}
                    tooltipLabel={currentValue => `${currentValue}%`}
                    tooltip='on'
                    min={1}
                    max={100}
                  />
                </Form>
              </Col>
            </Row>

            <Row>
              <Col xs={2}>
                <Form.Label>Preço Máximo</Form.Label>
              </Col>
              <Col xs={5}>
                <Form>
                  <RangeSlider
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    tooltipLabel={currentValue => `${currentValue} R$`}
                    tooltip='on'
                    min={1}
                    max={499}
                  />
                </Form>
              </Col>
            </Row>

          </Card.Body>
        </Card.Body>
      </Card>




    </div>
  )
}
export default Manager;
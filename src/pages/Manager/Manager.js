import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import customApi from '../api/customApi';


const Manager = (props) => {


  const [genres, setGenres] = React.useState([])
  const [game, setGame] = React.useState('')
  const [table, setTable] = React.useState(false)

  useEffect(() => {
    customApi.get('genres').then(res => {    
      setGenres(res.data)  
    })

  }, [])

  const { 
    sendMessage, 
    checked, 
    setChecked,   
    games, 
    setGames
  } = props

  const handleClick = (event) => {
    if (event.target.checked) {
      const array = checked
      array.push(event.target.value)
      setChecked(array)
      sendMessage(`${event.target.value}`)
    }
  }

  const handleButton = (event) => {
    const array = games
    array.push(game)
    setGames(array)
    setTable(!table)
    sendMessage(`${game.toUpperCase().replace(/\W/g, '')}*`)
    setGame('')
  }

  const handleChange = (event) => {
    setGame(event.target.value)
  }

  return (
    <div className="painel">
      <Card className='CardBody'>
        <Card.Header as="h4">Gerenciamento de Notificações</Card.Header>
        <Card.Body className='card-fluid '>
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

          <Card.Header as="h5">Jogos</Card.Header>
          <Card.Body>
            <Row>
                <Col xs={5}>
                  <Form.Label>Adicionar jogo a lista de notificações</Form.Label> 
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                  <Form.Control 
                  type='text'
                  placeholder="Nome" 
                  value={game}
                  onChange={handleChange}>
                  </Form.Control>
                </Col>
                <Button onClick={handleButton}>Adicionar</Button>
            </Row>  


            
            <Table striped bordered hover style={{marginTop: '30px'}}>
            <thead>
              <tr>
                <th colSpan={2}>Jogos na lista de notificação</th>
              </tr>
              <tr>
                <th>#</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {
                games.map((value, i) => {
                  return (
                    <tr key={i}>
                      <td >{i + 1}</td>
                      <td>{value}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
            

          </Card.Body>
        </Card.Body>
      </Card>

      


    </div>
  )
}
export default Manager;
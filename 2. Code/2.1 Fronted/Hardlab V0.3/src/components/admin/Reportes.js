import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Reportes = () => {


  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Reportes Equipos</Card.Title>
          <Card.Text>
            En esta seccion puede visualizar los reportes de equipos por fecha, modulo, estado
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Reportes Componentes</Card.Title>
          <Card.Text>
            En esta seccion puede ver los Componentes pedidos por cada estacion para la refactorización de los equipos
          </Card.Text>
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reportes;

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Reportes = () => {
  return (
    <div>
      <Row>
      <Col>
        <Card className="text-center" style={{ width: '16rem' }}>
          <Card.Img
            variant="top"
            src="https://cdn-icons-png.flaticon.com/512/1285/1285431.png"
            width={80}
            height={100}
          />
          <Card.Body>
            <Card.Title>Reportes Equipos</Card.Title>
            <Card.Text>
              En esta seccion puede visualizar los reportes de equipos por fecha, modulo, estado
            </Card.Text>
            <Button className="d-flex align-items-center justify-content-center" variant="dark" href="/reporte-equipo" target="_blank">
              Visualizar
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card className="text-center" style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hvodqrX7DXlSa-0W__7jh4JSX7rt1mZ1cg&usqp=CAU"  width={80}
            height={100}/>
          <Card.Body>
            <Card.Title>Reportes Componentes</Card.Title>
            <Card.Text>
              En esta seccion puede ver los Componentes pedidos por cada estacion para la refactorización de los equipos
            </Card.Text>
            <Button className="d-flex align-items-center justify-content-center" variant="dark" href="/reporte-componentes" target="_blank">Visualizar</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="text-center" style={{ width: '16rem' }}>
          <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hvodqrX7DXlSa-0W__7jh4JSX7rt1mZ1cg&usqp=CAU"  width={80}
            height={100}/>
          <Card.Body>
            <Card.Title>Reportes Equipos Refactorizados</Card.Title>
            <Card.Text>
              En esta seccion puede visualizar los Equipos Refactorizados 
            </Card.Text>
            <Button className="d-flex align-items-center justify-content-center" variant="dark" href="/reporte-equipo" target="_blank">Visualizar</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    </div>
  );
};

export default Reportes;

import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

export const VistaWeb = ({ equipos }) => {
  const [query, setQuery] = useState('');

  function FormatearFecha(fecha) {
    let fechaFormateada = new Date(fecha);
    return fechaFormateada.toLocaleDateString();
  }


  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: '#3388af', fontSize: '42px' }}>Reportes Equipos</h1>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CODIGO EQUIPO</th>
            <th>CODIGO DETALLE</th>
            <th>CODIGO ESTACION</th>
            <th>MARCA</th>
            <th>FECHA DE INGRESO</th>
            <th>ESTADO</th>
            <th>FECHA DE SALIDA</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo, index) => (
            <tr key={index}>
              <td>{equipo.COD_EQUIPO || '...'}</td>
              <td>{equipo.COD_DETALLE || '...'}</td>
              <td>{equipo.COD_ESTACION || '...'}</td>
              <td>{equipo.MARCA || '...'}</td>
              <td>{FormatearFecha(equipo.FECHA_INGRESO || '...')}</td>
              <td>{equipo.ESTADO || '...'}</td>
              <td>{FormatearFecha(equipo.FECHA_SALIDA || '...')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VistaWeb;

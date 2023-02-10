import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Cookies from "universal-cookie";
import axios from 'axios';

function TableEquiposUser() {
  const [data, setData] = useState([]);
  const cookies = new Cookies();
console.log(cookies)
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:4000/api/equipo/${cookies.get('estacionTrabajo')}`);
      setData(response.data);
      console.log(cookies);
    }

    fetchData();
  }, []);
  function FormatearFecha(fecha) {
    let fechaFormateada = new Date(fecha);
    return fechaFormateada.toLocaleDateString();
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Imagen</th>
          <th>Marca</th>
          <th>Fecha de Ingreso</th>
          <th>Estado</th>
          <th>Fecha de Salida</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const imageURL = URL.createObjectURL(new Blob([item.IMAGEN]));
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img src={imageURL} alt={item.NOMBRE} />
              </td>
              <td>{item.MARCA}</td>
              <td>{FormatearFecha(item.FECHA_INGRESO)}</td>
              <td>{item.ESTADO}</td>
              <td>{FormatearFecha(item.FECHA_SALIDA)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableEquiposUser;
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";

function TableUser() {
  const [data, setData] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:4000/api/herramienta/${cookies.get('estacionTrabajo')}`);
      setData(response.data);
    }

    fetchData();
  }, [cookies]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Cantidad</th>
          <th>Codigo de Barras</th>
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
              <td>{item.NOMBRE}</td>
              <td>{item.MARCA}</td>
              <td>{item.CANTIDAD}</td>
              <td>{item.CODIGO_BARRAS}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableUser;
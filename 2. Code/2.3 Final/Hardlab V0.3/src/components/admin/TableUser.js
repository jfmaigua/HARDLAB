import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import URIS from '../../config';

function TableUser() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = new Cookies();
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${URIS.HERRAMIENTAS}${cookies.get('estacionTrabajo')}`);
      setData(response.data);
    }

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  function handlePrevPage() {
    setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <div>
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
          {currentData.map((item, index) => {
            const imageURL = URL.createObjectURL(new Blob([item.IMAGEN]));
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={imageURL} alt={item.NOMBRE} />
                </td>
                <td>{item.NOMBRE}</td>
                <td>{item.MARCA}</td>
                <td>{item.CAN_ASIGNADA}</td>
                <td>{item.CODIGO_BARRAS}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
    </div>
  );
}

export default TableUser;

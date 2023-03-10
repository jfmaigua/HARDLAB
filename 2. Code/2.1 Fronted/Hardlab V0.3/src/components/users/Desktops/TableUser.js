import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import { BsArrowLeft,BsArrowRight } from 'react-icons/bs';

function TableUser() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

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
  const cookies = new Cookies();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:4000/api/herramientas/${cookies.get('estacionTrabajo')}`);
      setData(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
        <div className="d-flex justify-content-end mt-3">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">
                    <BsArrowLeft />
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">
                    <BsArrowRight />
                    </button>
                </div>
                <br/>

                <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
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
              <td>{item.NOMBRE}</td>
              <td>{item.MARCA}</td>
              <td>{item.CAN_ASIGNADA}</td>
              <td>{item.CODIGO_BARRAS}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
    </div>
    
  );
}

export default TableUser;
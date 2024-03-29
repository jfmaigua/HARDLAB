import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';
import { BsArrowLeft,BsArrowRight } from 'react-icons/bs';
import URIS from '../../../config';

function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_ESTACION: data.COD_ESTACION,
        NOMBRE_ESTACION: data.NOMBRE_ESTACION,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Form>
            <Form.Group controlId="formCOD_ESTACION">
                <Form.Label>Código de estación</Form.Label>
                <Form.Control type="text" name="COD_ESTACION" value={formData.COD_ESTACION} onChange={handleChange} disabled />
            </Form.Group>
            <Form.Group controlId="formNOMBRE">
                <Form.Label>Nombre de estación</Form.Label>
                <Form.Control type="text" name="NOMBRE_ESTACION" value={formData.NOMBRE_ESTACION} onChange={handleChange} />
            </Form.Group>
            <br />
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}


function StationTable() {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    useEffect(() => {
        axios.get(URIS.ESTACIONTRABAJO)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    

    
      const mostrarAlertaExito =() =>{
    
        swal({
          title:"¡Exitoso!", 
          text:"¡Estacion de Trabajo Guardada Exitosamente!", 
          icon:"success", 
          buton:true, 
        })
        .then((value)=>{
            window.location.href = './toolUpdate';
        });
        
      
      }

    const handleDelete = (id) => {
        
            swal({
                title: "Eliminar?",
                text: "Esta seguro de que desea eliminar esta Estacion de Trabajo!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Estacion de Trabajo eliminada exitosamente!", {
                    icon: "success",
                    
                  });
                  axios.delete( `${URIS.ESTACIONTRABAJO}${id}`)
                  .then(res => {
                      const updatedData = data.filter(item => item.COD_ESTACION !== id);
                      console.log(updatedData)
                      setData(updatedData);
                  })
                  .catch(err => {
                      console.log(err);
                  });
                } else {
                  swal("Estacion de Trabajo no Eliminada!");
                }
              });
          
       
    }

    const handleEdit = (item) => {
        setEditData(item);
        setIsEditing(true);
        setIsModalOpen(true);
    }

    const handleSave = (item) => {
        axios.put(`${URIS.ESTACIONTRABAJO}${item.COD_ESTACION}`, item)
            .then(res => {
                const updatedData = data.map(dataItem => {
                    if (dataItem.COD_ESTACION === item.COD_ESTACION) {
                        return res.data;
                    }
                    return dataItem;
                });
                setData(updatedData);
                setIsModalOpen(false);
                mostrarAlertaExito();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Estaciones</h6>
            </div>
            <div className="card-body">
            <div className="d-flex justify-content-end mt-3">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">
                    <BsArrowLeft />
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">
                    <BsArrowRight />
                    </button>
                </div>
                <br/>
                <div className="table-responsive">
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre Estación</th>  
                                <th>Acciones</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map(item => (
                                <TableRow key={item.COD_HERRAMIENTA} data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} aria-labelledby="ModalHeader">
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader" className='font-weight-bold text-primary'>Editar </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm data={editData} handleSave={handleSave}></EditForm>
                </Modal.Body>
            </Modal>

        </div>
    );
}

function TableRow({ data, handleDelete, handleEdit }) {
    return (
        <tr>
            <td>{data.NOMBRE_ESTACION}</td>
            <td>
                <button onClick={() => handleDelete(data.COD_ESTACION)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );

}
export default StationTable;
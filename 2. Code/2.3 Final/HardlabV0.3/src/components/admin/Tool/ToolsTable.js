import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { BsArrowLeft,BsArrowRight } from 'react-icons/bs';
import URIS from '../../../config';


function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_HERRAMIENTA: data.COD_HERRAMIENTA,
        TIPO: data.TIPO,
        NOMBRE: data.NOMBRE,
        MARCA: data.MARCA,
        CANTIDAD: data.CANTIDAD,
        CODIGO_BARRAS: data.CODIGO_BARRAS,
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Form>
            <Form.Group controlId="formCOD_HERRAMIENTA">
                <Form.Label>Código de herramienta</Form.Label>
                <Form.Control type="text" name="COD_HERRAMIENTA" value={formData.COD_HERRAMIENTA} onChange={handleChange} disabled />
            </Form.Group>
            <Form.Group controlId="formNOMBRE">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="NOMBRE" value={formData.NOMBRE} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formMARCA">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" name="MARCA" value={formData.MARCA} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCANTIDAD">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control type="number" name="CANTIDAD" value={formData.CANTIDAD} onChange={handleChange} disable/>
            </Form.Group>
            <Form.Group controlId="formCODIGO_BARRAS">
                <Form.Label>Código de barras</Form.Label>
                <Form.Control type="text" name="CODIGO_BARRAS" value={formData.CODIGO_BARRAS} onChange={handleChange} />
            </Form.Group>            
            <Form.Group controlId="formCODIGO_BARRAS">
                <Form.Label>Tipo</Form.Label>
                <Form.Control type="text" name="CODIGO_BARRAS" value={formData.TIPO} onChange={handleChange} disable />
            </Form.Group>
            <br />
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}

function ToolsTable() {
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


    const mostrarAlertaErrror = (id) => {
        swal({
            title: "Eliminar?",
            text: "Esta seguro de que desea eliminar esta herramienta!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Herramienta eliminada exitosamente!", {
                        icon: "success",

                    });
                    handleDelete(id)
                } else {
                    swal("Herramienta no Eliminada!");
                }
            });
    }

    const mostrarAlertaExito = () => {

        swal({
            title: "¡Exitoso!",
            text: "¡Herramienta Guardada Exitosamente!",
            icon: "success",
            buton: true,
        })
            .then((value) => {
                window.location.href = './toolUpdate';
            });


    }

    useEffect(() => {
        axios.get(URIS.HERRAMIENTA)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${URIS.HERRAMIENTA}${id}`)
            .then(res => {
                const updatedData = data.filter(item => item.COD_HERRAMIENTA !== id);
                console.log(updatedData)
                setData(updatedData);
            })
            .catch(err => {
                console.log(err);
            });
    }
    const handleEdit = (item) => {
        setEditData(item);
        setIsEditing(true);
        setIsModalOpen(true);
    }
    const handleSave = (item) => {
        axios.put(`${URIS.HERRAMIENTA}${item.COD_HERRAMIENTA}`, item)
            .then(res => {
                const updatedData = data.map(dataItem => {
                    if (dataItem.COD_HERRAMIENTA === item.COD_HERRAMIENTA) {
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
                <h6 className="m-0 font-weight-bold text-primary">Herramientas</h6>
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
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Cantidad</th>
                                <th>Codigo de Barras</th>
                                <th>Operaciones</th>
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
                    <Modal.Title id="ModalHeader" className='font-weight-bold text-primary'>Editar herramienta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm data={editData} handleSave={handleSave}></EditForm>
                </Modal.Body>
            </Modal>

        </div>
    );

    function TableRow({ data, handleDelete, handleEdit }) {
        return (
            <tr>
                <td>{data.COD_HERRAMIENTA}</td>
                <td>{data.NOMBRE}</td>
                <td>{data.MARCA}</td>
                <td>{data.CANTIDAD}</td>
                <td>{data.CODIGO_BARRAS}</td>
                <td>
                    <button onClick={() => mostrarAlertaErrror(data.COD_HERRAMIENTA)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
                </td>

            </tr>
        );
    }
}
export default ToolsTable;
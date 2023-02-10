import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_EQUIPO: data.COD_EQUIPO,
        COD_ESTACION: data.COD_ESTACION,
        MARCA: data.MARCA,
        FECHA_ENTRADA: data.FECHA_INGRESO,
        FECHA_SALIDA: data.FECHA_SALIDA,
        ESTADO: data.ESTADO
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
                <Form.Label>Código de Equipo</Form.Label>
                <Form.Control type="text" name="COD_EQUIPO" value={formData.COD_EQUIPO} onChange={handleChange} disabled />
            </Form.Group>
            <Form.Group controlId="formCOD_ESTACION">
                <Form.Label>Código de estación</Form.Label>
                <Form.Control type="text" name="COD_ESTACION" value={formData.COD_ESTACION} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formMARCA">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" name="MARCA" value={formData.MARCA} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formFECHA_ENTRADA">
                <Form.Label>Fecha de entrada</Form.Label>
                <Form.Control type="date" name="FECHA_INGRESO" value={formData.FECHA_INGRESO} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formFECHA_SALIDA">
                <Form.Label>Fecha de salida</Form.Label>
                <Form.Control type="date" name="FECHA_SALIDA" value={formData.FECHA_SALIDA} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formESTADO">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" name="ESTADO" value={formData.ESTADO} onChange={handleChange} />
            </Form.Group>
            <br />
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}


function DesktopTable() {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        axios.get('http://localhost:4000/api/equipo')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/equipo/${id}`)
            .then(res => {
                const updatedData = data.filter(item => item.COD_EQUIPO !== id);
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
        axios.put(`http://localhost:4000/api/equipo/${item.COD_EQUIPO}`, item)
            .then(res => {
                const updatedData = data.map(dataItem => {
                    if (dataItem.COD_EQUIPO === item.COD_EQUIPO) {
                        return res.data;
                    }
                    return dataItem;
                });
                setData(updatedData);
                setIsModalOpen(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    };
    
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Herramientas</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Código equipo</th>
                                <th>Estación</th>
                                <th>Marca</th>
                                <th>Fecha de Entrada</th>
                                <th>Fecha de Salida</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <TableRow key={item.COD_EQUIPO} data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} aria-labelledby="ModalHeader">
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader">Editar Equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm data={editData} handleSave={handleSave}></EditForm>
                </Modal.Body>
            </Modal>

        </div>
    );

    function FormatearFecha(fecha) {
        let fechaFormateada = new Date(fecha);
        return fechaFormateada.toLocaleDateString();
      }

function TableRow({ data, handleDelete, handleEdit }) {
    return (
        <tr>
            <td>{data.COD_EQUIPO}</td>
            <td>{data.COD_ESTACION}</td>
            <td>{data.MARCA}</td>
            <td>{FormatearFecha(data.FECHA_INGRESO)}</td>
            <td>{FormatearFecha(data.FECHA_SALIDA)}</td>
            <td>{data.ESTADO}</td>
            <td>
                <button onClick={() => handleDelete(data.COD_EQUIPO)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );
}
}
export default DesktopTable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_ESTACION: data.COD_ESTACION,
        NOMBRE: data.NOMBRE,
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
                <Form.Control type="text" name="NOMBRE" value={formData.NOMBRE} onChange={handleChange} />
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


    useEffect(() => {
        axios.get('http://localhost:4000/api/estacion_trabajo')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete( `http://localhost:4000/api/estacion_trabajo/${id}`)
            .then(res => {
                const updatedData = data.filter(item => item.COD_ESTACION !== id);
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
        axios.put(`http://localhost:4000/api/estacion_trabajo/${item.COD_ESTACION}`, item)
            .then(res => {
                const updatedData = data.map(dataItem => {
                    if (dataItem.COD_ESTACION === item.COD_ESTACION) {
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
    }

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
                                <th>Código Estación</th>
                                <th>Nombre Estación</th>  
                                <th>Acciones</th>                              
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <TableRow key={item.COD_HERRAMIENTA} data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} aria-labelledby="ModalHeader">
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader">Editar herramienta</Modal.Title>
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
            <td>{data.COD_ESTACION}</td>
            <td>{data.NOMBRE}</td>
            <td>
                <button onClick={() => handleDelete(data.COD_ESTACION)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );

}
export default StationTable;
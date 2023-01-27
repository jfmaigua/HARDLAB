import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal,Form } from 'react-bootstrap';

function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_EQUIPO: data.COD_HERRAMIENTA,
        COD_ESTACION: data.COD_ESTACION,        
        MARCA: data.MARCA,
        FECHA_ENTRADA: data.CANTIDAD,
        FECHA_SALIDA: data.CODIGO_BARRAS,        
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
            <Form.Group controlId="formCANTIDAD">
                <Form.Label>Fecha de entrada</Form.Label>
                <Form.Control type="date" name="FECHA_ENTRADA" value={formData.FECHA_ENTRADA} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCODIGO_BARRAS">
                <Form.Label>Fecha de salida</Form.Label>
                <Form.Control type="text" name="FECHA_SALIDA" value={formData.FECHA_SALIDA} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCODIGO_BARRAS">
                <Form.Label>Estado</Form.Label>
                <Form.Control type="text" name="ESTADO" value={formData.ESTADO} onChange={handleChange} />
            </Form.Group>
            <br/>
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}


function DesktopTable() {

    const [data, setData] = useState([]);
    const [herramienta, setEquipo] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    useEffect(() => {
        axios.get('/api/detalleequipo')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    console.log(data)

    useEffect(() => {
        axios.get(`/api/equipo/${data.COD_EQUIPO}`)
            .then(res => {
                setEquipo(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/equipo/${data.COD_EQUIPO}`)
            .then(res => {
                const updatedData = data.filter(item => item.COD_EQUIPO !== id);
                console.log(updatedData)
                setEquipo(updatedData);
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
        axios.put(`/api/equipo/${item.COD_EQUIPO}`, item)
        .then(res => {
            const updatedData = data.map(dataItem => {
                if (dataItem.COD_EQUIPO === item.COD_EQUIPO) {
                    return res.data;
                }
                return dataItem;
            });
            setEquipo(updatedData);
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
                    <table className="table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Código herramienta</th>
                                <th>Estación</th>
                                <th>Marca</th>                                
                                <th>Fecha de Entrada</th>
                                <th>Fecha de Salida</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <TableRow key={item.COD_EQUIPO} herramienta={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} aria-labelledby="ModalHeader">
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader">Editar herramienta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm herramienta={editData} handleSave={handleSave}></EditForm> 
                </Modal.Body>
            </Modal>

        </div>
    );
}

function TableRow({ herramienta, handleDelete, handleEdit }) {
    return (
        <tr>
            <td>{herramienta.COD_EQUIPO}</td>
            <td>{herramienta.COD_ESTACION}</td>
            <td>{herramienta.NOMBRE}</td>
            <td>{herramienta.FECHA_ENTRADA}</td>
            <td>{herramienta.FECHA_SALIDA}</td>
            <td>{herramienta.ESTADO}</td>
            <td>
                <button onClick={() => handleDelete(herramienta.COD_EQUIPO)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(herramienta)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );

}
export default DesktopTable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal,Form } from 'react-bootstrap';

function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        CI: data.CI,
        COD_ESTACION: data.COD_ESTACION,
        NOMBRE: data.NOMBRE,
        APELLIDO: data.APELLIDO,
        COD_PERSONA: data.COD_PERSONA,
        TELEFONO: data.TELEFONO,
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
                <Form.Label>Código</Form.Label>
                <Form.Control type="text" name="COD_PERSONA" value={formData.COD_PERSONA} onChange={handleChange} disabled />
            </Form.Group>
            <Form.Group controlId="formCOD_ESTACION">
                <Form.Label>Cédula de Identidad</Form.Label>
                <Form.Control type="text" name="CI" value={formData.CI} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formNOMBRE">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="NOMBRE" value={formData.NOMBRE} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formMARCA">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" name="APELLIDO" value={formData.APELLIDO} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCANTIDAD">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="number" name="TELEFONO" value={formData.TELEFONO} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCODIGO_BARRAS">
                <Form.Label>Estación</Form.Label>
                <Form.Control type="text" name="COD_ESTACION" value={formData.COD_ESTACION} onChange={handleChange} />
            </Form.Group>
            <br/>
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}


function PersonTable() {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    useEffect(() => {
        axios.get('/api/persona')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/persona/${id}`)
            .then(res => {
                const updatedData = data.filter(item => item.COD_PERSONA !== id);
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
        axios.put(`/api/persona/${item.COD_PERSONA}`, item)
        .then(res => {
            const updatedData = data.map(dataItem => {
                if (dataItem.COD_PERSONA === item.COD_PERSONA) {
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
                <h6 className="m-0 font-weight-bold text-primary">Estudiantes</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Cédula de Identidad</th>                              
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Estación</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <TableRow key={item.COD_HERRAMIENTA} data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
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
                    <EditForm data={editData} handleSave={handleSave}></EditForm> 
                </Modal.Body>
            </Modal>

        </div>
    );
}

function TableRow({ data, handleDelete, handleEdit }) {
    return (
        <tr>
            <td>{data.CI}</td>
            <td>{data.NOMBRE}</td>
            <td>{data.APELLIDO}</td>
            <td>{data.COD_ESTACION}</td>
            <td>{data.TELEFONO}</td>
            <td>
                <button onClick={() => handleDelete(data.COD_HERRAMIENTA)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );

}
export default PersonTable;
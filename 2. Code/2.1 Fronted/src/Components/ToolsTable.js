import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal,Form } from 'react-bootstrap';

function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_HERRAMIENTA: data.COD_HERRAMIENTA,
        COD_ESTACION: data.COD_ESTACION,
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
            <Form.Group controlId="formCOD_ESTACION">
                <Form.Label>Código de estación</Form.Label>
                <Form.Control type="text" name="COD_ESTACION" value={formData.COD_ESTACION} onChange={handleChange} />
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
                <Form.Control type="number" name="CANTIDAD" value={formData.CANTIDAD} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formCODIGO_BARRAS">
                <Form.Label>Código de barras</Form.Label>
                <Form.Control type="text" name="CODIGO_BARRAS" value={formData.CODIGO_BARRAS} onChange={handleChange} />
            </Form.Group>
            <br/>
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}


function ToolsTable() {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    

    useEffect(() => {
        axios.get('/api/herramienta')
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/herramienta/${id}`)
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
        axios.put(`/api/herramienta/${item.COD_HERRAMIENTA}`, item)
        .then(res => {
            const updatedData = data.map(dataItem => {
                if (dataItem.COD_HERRAMIENTA === item.COD_HERRAMIENTA) {
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
                    <table className="table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Código herramienta</th>
                                <th>Estación</th>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Cantidad</th>
                                <th>Código de Barras</th>
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
            <td>{data.COD_HERRAMIENTA}</td>
            <td>{data.COD_ESTACION}</td>
            <td>{data.NOMBRE}</td>
            <td>{data.MARCA}</td>
            <td>{data.CANTIDAD}</td>
            <td>{data.CODIGO_BARRAS}</td>
            <td>
                <button onClick={() => handleDelete(data.COD_HERRAMIENTA)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );

}
export default ToolsTable;
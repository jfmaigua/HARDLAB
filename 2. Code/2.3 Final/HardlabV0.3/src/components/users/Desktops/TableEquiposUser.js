import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Portal } from 'react-portal';
import swal from 'sweetalert';
import { BsEyeFill } from 'react-icons/bs';
import Cookies from "universal-cookie";
import { BsArrowLeft,BsArrowRight } from 'react-icons/bs';
import URIS from '../../../config';


function EditForm({ data, handleSave }) {
    const [formData, setFormData] = useState({
        COD_EQUIPO: data.COD_EQUIPO,
        COD_ESTACION: data.COD_ESTACION,
        MARCA: data.MARCA,
        FECHA_INGRESO: data.FECHA_INGRESO,
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
            <Form.Group controlId="formCOD_EQUIPO">
                <Form.Label>Código de Equipo</Form.Label>
                <Form.Control type="text" name="COD_EQUIPO" value={formData.COD_EQUIPO} onChange={handleChange} disabled />
            </Form.Group>
            <Form.Group controlId="formCOD_ESTACION">
                <Form.Label>Código de estación</Form.Label>
                <Form.Control type="text" name="COD_ESTACION" value={formData.COD_ESTACION} onChange={handleChange} disabled />
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
            <Form.Control as="select" name="ESTADO" value={formData.ESTADO} onChange={handleChange}>
                <option value="dañada">Dañada</option>
                <option value="repotenciar">Repotenciar</option>
                <option value="alta">Alta</option>
            </Form.Control>
            </Form.Group>
            <br />
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}

function TableEquiposUser() {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showPeticion, setShowPeticion] = useState(false);
    const cookies = new Cookies();

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

    console.log(cookies)
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${URIS.EQUIPO}${cookies.get('estacionTrabajo')}`);
            setData(response.data);
            console.log(cookies);
        }

        fetchData();
    }, []);

    function FormatearFecha(fecha) {
        let fechaFormateada = new Date(fecha);
        return fechaFormateada.toLocaleDateString();
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
                    swal("Equipo eliminado exitosamente!", {
                        icon: "success",

                    });
                    handleDelete(id)
                } else {
                    swal("Equipo no Eliminado!");
                }
            });
    }


    const mostrarAlertaExito = () => {

        swal({
            title: "¡Exitoso!",
            text: "¡Equipo Guardado Exitosamente!",
            icon: "success",
            buton: true,
        })

    }

    const mostrarAlertaNoSeEncuentra = () => {

        swal({
            title: "¡ERROR!",
            text: "¡El equipo seleccionado no cuenta con esa información!",
            icon: "warning",
            buton: true,
        })

    }

    const handleShowDetail = (item) => {
        setSelectedItem(item);
        setShowDetail(true);
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedItem("")
    }


    const handleShowPeticion = (item) => {
        setSelectedItem(item);
        setShowPeticion(true);
    }

    const handleClosePeticion = () => {
        setShowPeticion(false);
        setSelectedItem("")
    }

    const handleDelete = (id) => {
        axios.delete(`${URIS.EQUIPO}${id}`)
            .then(res => {
                const updatedData = data.filter(item => item.COD_EQUIPO !== id);
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
        axios.put(`${URIS.EQUIPO}${item.COD_EQUIPO}`, item)
            .then(res => {
                const updatedData = data.map(dataItem => {
                    if (dataItem.COD_EQUIPO === item.COD_EQUIPO) {
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
    };

    function DetailModal({ show, onClose, item }) {
        const [detailData, setDetailData] = useState({});

        useEffect(() => {
            axios.get(`${URIS.DETALLEEQUIPO}${item}`)
                .then(res => {
                    const detail = res.data.map(dataItem => {
                        setDetailData(dataItem);
                    })
                })
                .catch((error) => {
                    setShowDetail(false);
                    mostrarAlertaNoSeEncuentra();
                });
        }, [item]);

        return (
            <div>
                {detailData &&
                    <Portal>
                        <Modal show={show} onHide={onClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className='font-weight-bold text-primary'>Detalle de Equipo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='row'>
                                    <div className="col-lg-4 mb-4 ">
                                        <span className='font-weight-bold'>Serial</span>
                                        <p>{detailData.SERIAL}</p>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Estacion de Trabajo</span>
                                    <p>{detailData.COD_ESTACION}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Fecha de ingreso</span>
                                    <p>{FormatearFecha(detailData.FECHA_INGRESO)}</p>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className='font-weight-bold'>Fecha de salida</span>
                                    <p>{FormatearFecha(detailData.FECHA_SALIDA)}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Marca</span>
                                    <p>{detailData.MARCA}</p>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className='font-weight-bold'>Procesador</span>
                                    <p>{detailData.PROCESADOR}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>RAM</span>
                                    <p>{detailData.RAM}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Main Board</span>
                                    <p>{detailData.MAIN_BOARD}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Puertos USB</span>
                                    <p>{detailData.PUERTOS_USB}</p>
                                </div>

                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Tarjeta de Sonido</span>
                                    <p>{detailData.TARJETA_SONIDO}</p>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className='font-weight-bold'>Tarjeta de Video</span>
                                    <p>{detailData.TARJETA_VIDEO}</p>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </Portal>
                }
            </div >
        );
    };
    function PeticionModal({ show, onClose, item }) {
        const [detailData, setDetailData] = useState({});

        useEffect(() => {
            axios.get(`${URIS.EQUIPOPETICION}${item}`)
                .then(res => {
                    const detail = res.data.map(dataItem => {
                        setDetailData(dataItem);
                    })
                })
                .catch((error) => {
                    setShowPeticion(false);
                    mostrarAlertaNoSeEncuentra();
                });
        }, [item]);

        return (
            <div>
                {detailData &&
                    <Portal>
                        <Modal show={show} onHide={onClose}>
                            <Modal.Header closeButton>
                                <Modal.Title className='font-weight-bold text-primary'>Componentes a solicitar</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='row'>
                                    <div className="col-lg-4 mb-4 ">
                                        <span className='font-weight-bold'>Serial</span>
                                        <p>{detailData.SERIAL}</p>
                                    </div>
                                </div>

                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>RAM</span>
                                    <p>{detailData.RAM}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Disco</span>
                                    <p>{(detailData.DISCO)}</p>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className='font-weight-bold'>Pantalla</span>
                                    <p>{(detailData.PANTALLA)}</p>
                                </div>
                                <div className="col-lg-4">
                                    <span className='font-weight-bold'>Touchpad</span>
                                    <p>{detailData.TOUCHPAD}</p>
                                </div>

                                <div className="col-lg-4 ">
                                    <span className='font-weight-bold'>Teclado</span>
                                    <p>{detailData.TECLADO}</p>
                                </div>
                                <div className="col-lg-4 ">
                                    <span className='font-weight-bold'>Comentarios</span>
                                    <p>{detailData.COMENTARIOS}</p>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </Portal>
                }
            </div >
        );
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Equipos</h6>
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
                                <th>Detalle</th>
                                <th>Código equipo</th>
                                <th>Marca</th>
                                <th>Fecha de Entrada</th>
                                <th>Fecha de Salida</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map(item => (
                                <TableRow key={item.COD_EQUIPO} data={item} handleDelete={handleDelete} handleEdit={handleEdit} handleShowDetail={handleShowDetail} handleShowPeticion={handleShowPeticion} />
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} aria-labelledby="ModalHeader">
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader" className='font-weight-bold text-primary'>Editar Equipo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm data={editData} handleSave={handleSave}></EditForm>
                </Modal.Body>
            </Modal>
            {showPeticion && selectedItem && <PeticionModal show={showPeticion} onClose={handleClosePeticion} item={selectedItem} />}
            {showDetail && <DetailModal show={showDetail} onClose={handleCloseDetail} item={selectedItem} />}
        </div>
    );



    function TableRow({ data, handleDelete, handleEdit, handleShowDetail, handleShowPeticion }) {
        return (
            <tr>
                <td>
                    &nbsp;&nbsp;
                    <BsEyeFill onClick={() => handleShowDetail(data.COD_EQUIPO)} >Equipo</BsEyeFill>
                </td>
                <td> &nbsp;&nbsp;
                    {data.SERIAL}</td>
                <td>{data.MARCA}</td>
                <td>{FormatearFecha(data.FECHA_INGRESO)}</td>
                <td>{FormatearFecha(data.FECHA_SALIDA)}</td>
                <td>{data.ESTADO}</td>
                <td>
                    <button onClick={() => mostrarAlertaErrror(data.COD_EQUIPO)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                    &nbsp;&nbsp;
                    <button onClick={() => handleShowPeticion(data.COD_EQUIPO)} className='btn btn-info'>Ver Petición</button>
                    &nbsp;&nbsp;
                    <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Repotenciar</button>
                </td>

            </tr>
        );
    }
}
export default TableEquiposUser;
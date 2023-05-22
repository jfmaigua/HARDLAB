import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { Modal, Form } from 'react-bootstrap';
import URIS from '../../../config';

function FormularioEquipo() {


    const [data, setData] = useState('');
    const cookies = new Cookies();    
    const [showPortatil, setShowPortatil] = useState(false);
    const [showEscritorio, setShowEscritorio] = useState(false);
    const [equipo, setEquipo] = useState({
        COD_ESTACION: '',
        IMAGEN: '',
        MARCA: '',
        TIPO: '',
        FECHA_INGRESO: '',
        FECHA_SALIDA: '',
        ESTADO: '',
        MAIN_BOARD: '',
        SERIAL: '',
        PROCESADOR: '',
        RAM: '',
        DISCO_DURO: '',
        UNIDAD_CD: '',
        PUERTOS_USB: '',
        TARJETA_VIDEO: '',
        COMENTARIOS: ''
    });

    const handleChange = (e) => {
        setEquipo({
            ...equipo,
            [e.target.name]: e.target.value
        });
    }

    const handleLogout = () => {

        cookies.remove('id', { path: "/" });
        cookies.remove('firstName', { path: "/" });
        cookies.remove('lastName', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('rol', { path: "/" });
        cookies.remove('token', { path: "/" });

        window.location.href = './';
    };


    const [error, setError] = useState({});
    const [isValid, setIsValid] = useState(false);
    
    const mostrarAlerta = () => {
        swal({
            title: "¡Información Incompleta!",
            text: "¡Rellene todo los Campos!",
            icon: "warning",
            buton: "OK!",
        });
    }
    
    const mostrarAlertaFecha = () => {
        swal({
            title: "¡Ocurrio un error!",
            text: "¡La fecha de ingreso no puede ser mayor o igual a la fecha de salida!",
            icon: "warning",
            buton: "OK!",
        });
    }

    const mostrarAlertaExito = () => {
        swal({
            title: "¡Exitoso!",
            text: "¡Equipo Guardado Exitosamente!",
            icon: "success",
            buton: true,
        })
            .then((value) => {
                window.location.href = './equipos-usuario';
            });
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!equipo.COD_ESTACION || !equipo.COMENTARIOS || !equipo.DISCO_DURO || !equipo.ESTADO || !equipo.FECHA_INGRESO || !equipo.FECHA_SALIDA || !equipo.IMAGEN || !equipo.MAIN_BOARD || !equipo.MARCA || !equipo.PROCESADOR || !equipo.PUERTOS_USB || !equipo.RAM || !equipo.TIPO || !equipo.SERIAL || !equipo.PUERTOS_USB || !equipo.TARJETA_VIDEO) {
            mostrarAlerta();
            return;
        }

        const ingreso = new Date(equipo.FECHA_INGRESO).getTime();
        const salida = new Date(equipo.FECHA_SALIDA).getTime();

        if (ingreso >= salida) {
            mostrarAlertaFecha();
            return;
        }

        if (equipo.TIPO == 'Portatil')
            setShowPortatil(true);
        else if (equipo.TIPO == 'Escritorio')
            setShowEscritorio(true);



    }

    useEffect(() => {
        fetch(URIS.ESTACIONTRABAJO)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

    const estaciones = [];
    estaciones.push(<option className="form-control input-group" hidden>Seleccionar Estacion</option>)
    for (const estacion of data) {

        estaciones.push(<option className="form-control input-group" value={estacion.COD_ESTACION}>{estacion.NOMBRE_ESTACION}</option>)
    }

    const handleShowPortatil = () => {
        setShowPortatil(true);
    }

    const handleClosePortatil = () => {
        setShowPortatil(false);
    }
    const handleShowEscritorio = () => {
        setShowEscritorio(true);
    }

    const handleCloseEscritorio = () => {
        setShowEscritorio(false);
    }
    function EscritorioForm() {

        const [escritorio, setEscritorio] = useState({
            PUERTOS_PS: '',
            PUERTOS_PCI_EXPRESS: '',
            PUERTOS_PCI: '',
            UNIDAD_DISQUETE: '',
            TARJETA_RED: '',
            TARJETA_SONIDO: ''
        });

        const handleChange = (e) => {
            setEscritorio({
                ...escritorio,
                [e.target.name]: e.target.value
            });
        }

        const handleSubmitEscritorio = event => {

            event.preventDefault();
            axios.post(URIS.EQUIPO, equipo)
                .then((response) => {
                    const equipoId = response.data.id;

                    axios.post(URIS.EQUIPOESCRITORIO, {
                        COD_EQUIPO: equipoId,
                        PUERTOS_PS: escritorio.PUERTOS_PS,
                        PUERTOS_PCI: escritorio.PUERTOS_PCI,
                        PUERTOS_PCI_EXPRESS: escritorio.PUERTOS_PCI_EXPRESS,
                        UNIDAD_DISQUETE: escritorio.UNIDAD_DISQUETE,
                        TARJETA_RED: escritorio.TARJETA_RED,
                        TARJETA_SONIDO: escritorio.TARJETA_SONIDO,
                    }).then((response) => {
                        mostrarAlertaExito();
                    });

                });
        }

        return (
            <Form>
                <Form.Group controlId="formCOD_EQUIPO">
                    <Form.Label>Puertos PS</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_PS" value={escritorio.PUERTOS_PS} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <Form.Group controlId="formCOD_ESTACION">
                    <Form.Label>Puertos PCI Express</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_PCI_EXPRESS" value={escritorio.PUERTOS_PCI_EXPRESS} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <Form.Group controlId="formMARCA">
                    <Form.Label>Puertos PCI</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_PCI" value={escritorio.PUERTOS_PCI} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <Form.Group controlId="formFECHA_ENTRADA">
                    <Form.Label>Unidad de Disquete</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="UNIDAD_DISQUETE" value={escritorio.UNIDAD_DISQUETE} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <Form.Group controlId="formESTADO">
                    <Form.Label>Tarjeta de Red</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="TARJETA_RED" value={escritorio.TARJETA_RED} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <Form.Group controlId="formESTADO">
                    <Form.Label>Tarjeta de Sonido</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="TARJETA_SONIDO" value={escritorio.TARJETA_SONIDO} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <br />
                <button onClick={handleSubmitEscritorio} className='btn btn-success btn-icon-split'>Guardar</button>
            </Form>
        );
    }

    function PortatilForm() {

        const [portatil, setFormData] = useState({
            TECLADO: '',
            PANTALLA: '',
            TOUCHPAD: '',
            MOUSE: '',
            BATERIA: '',
            CARGADOR: ''
        });

        const handleChange = (e) => {
            setFormData({
                ...portatil,
                [e.target.name]: e.target.value
            });
        }
        const handleSubmitPortatil = event => {
            event.preventDefault();
            axios.post(URIS.EQUIPO, equipo)
                .then((response) => {
                    const equipoId = response.data.id;

                    axios.post(URIS.PORTATIL, {
                        COD_EQUIPO: equipoId,
                        TECLADO: portatil.TECLADO,
                        PANTALLA: portatil.PANTALLA,
                        TOUCHPAD: portatil.TOUCHPAD,
                        MOUSE: portatil.MOUSE,
                        BATERIA: portatil.BATERIA,
                        CARGADOR: portatil.CARGADOR,
                    }).then((response) => {
                        mostrarAlertaExito();
                    });

                });
        }

        return (
            <Form>
                <Form.Group controlId="formCOD_EQUIPO">
                    <Form.Label>Teclado</Form.Label>
                    <Form.Control type="text" name="TECLADO" value={portatil.TECLADO} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formCOD_ESTACION">
                    <Form.Label>Pantalla</Form.Label>
                    <Form.Control type="text" name="PANTALLA" value={portatil.PANTALLA} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formMARCA">
                    <Form.Label>Mouse</Form.Label>
                    <Form.Control type="text" name="MOUSE" value={portatil.MOUSE} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formFECHA_ENTRADA">
                    <Form.Label>Bateria</Form.Label>
                    <Form.Control type="text" name="BATERIA" value={portatil.BATERIA} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formESTADO">
                    <Form.Label>Cargador</Form.Label>
                    <select type="text" className="form-control input-group" id="floatingInput" name="CARGADOR" value={portatil.CARGADOR} onChange={handleChange} >
                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                        <option className="form-control input-group" value="SI">SI</option>
                        <option className="form-control input-group" value="NO">NO</option>
                    </select>
                </Form.Group>
                <br />
                <button onClick={handleSubmitPortatil} className='btn btn-success btn-icon-split'>Guardar</button>
            </Form>
        );
    }

    return (
        <div>
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">

                {/* Main Content */}
                <div id="content">

                    {/* Topbar */}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        {/* Sidebar Toggle (Topbar) */}
                        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                            <i className="fa fa-bars"></i>
                        </button>

                        {/* Topbar Search */}
                        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div className="input-group">
                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                    aria-label="Search" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* {/* Topbar Navbar */}
                        <ul className="navbar-nav ml-auto">

                            {/* Nav Item - User Information */}
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{cookies.get('firstName') + ' ' + cookies.get('lastName')}</span>
                                    <img className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg" alt='imagen' />
                                </a>
                            </li>
                            {/* Nav Item - Cerrar Sesion */}

                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="/" onClick={handleLogout} id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  > Cerrar Sesión</a>
                            </li>
                        </ul>
                    </nav>

                    {/* {/* End of Topbar */}

                    {/* Begin Page Content */}
                    <div className="container-fluid">

                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Agregar un nuevo equipo</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Caracteristicas</h6>
                                        </div>
                                        <div className='card-body'>
                                            <div className='row'>

                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Fecha de ingreso</label>
                                                    <input type="date" className="form-control input-group" id="floatingInput" name="FECHA_INGRESO" value={equipo.FECHA_INGRESO} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Fecha de salida</label>
                                                    <input type="date" className="form-control input-group" id="floatingInput" name="FECHA_SALIDA" value={equipo.FECHA_SALIDA} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Marca</label>
                                                    <input type="text" className="form-control input-group" id="floatingInput" name="MARCA" value={equipo.MARCA} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className="col-lg-4 mb-4 ">
                                                    <label htmlFor="floatingInput">Estado</label>
                                                    <select type="text" className="form-control input-group" id="floatingInput" name="ESTADO" value={equipo.ESTADO} onChange={handleChange} >
                                                        <option className="form-control input-group" value="" hidden>Escoger una opción</option>
                                                        <option className="form-control input-group" value="Repotenciar">Repotenciar</option>
                                                        <option className="form-control input-group" value="Dañada">Dañada</option>
                                                    </select>
                                                </div>


                                                <div class="col-lg-4 mb-4 ">
                                                    <label htmlFor="customFile">Serial</label>
                                                    <br />
                                                    <input type="text" className="form-control input-group" id="customFile" name="SERIAL" value={equipo.SERIAL} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4 ">
                                                    <label htmlFor="floatingInput">Tipo</label>
                                                    <select type="text" className="form-control input-group" id="floatingInput" name="TIPO" value={equipo.TIPO} onChange={handleChange} >
                                                        <option className="form-control input-group" value="" hidden>Escoger una opción</option>
                                                        <option className="form-control input-group" value="Portatil">Portatil</option>
                                                        <option className="form-control input-group" value="Escritorio">Escritorio</option>
                                                    </select>
                                                </div>


                                            </div>

                                            <div className='row'>
                                                <div className="col-lg-4 mb-4 ">
                                                    <label htmlFor="floatingInput">Main Board</label>
                                                    <input type="text" className="form-control input-group" id="customFile" name="MAIN_BOARD" value={equipo.MAIN_BOARD} onChange={handleChange} />
                                                </div>
                                                <div class="col-lg-4 mb-4">
                                                    <label htmlFor="customFile">Tarjeta de Video</label>
                                                    <br />
                                                    <input type="text" className="form-control input-group" id="customFile" name="TARJETA_VIDEO" value={equipo.TARJETA_VIDEO} onChange={handleChange} />
                                                </div>


                                                <div className="col-lg-4 mb-4">
                                                    <label htmlFor="customFile">Procesador</label>
                                                    <br /><input type="text" className="form-control input-group" id="customFile" name="PROCESADOR" value={equipo.PROCESADOR} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className="col-lg-4 mb-4 ">
                                                    <label htmlFor="floatingInput">RAM</label>
                                                    <input type="text" className="form-control input-group" id="customFile" name="RAM" value={equipo.RAM} onChange={handleChange} />
                                                </div>

                                                <div class="col-lg-4 mb-4 ">
                                                    <label htmlFor="customFile">Disco Duro</label>
                                                    <br />
                                                    <input type="text" className="form-control input-group" id="customFile" name="DISCO_DURO" value={equipo.DISCO_DURO} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4">
                                                    <label htmlFor="customFile">Unidad CD</label>
                                                    <br />
                                                    <select type="text" className="form-control input-group" id="floatingInput" name="UNIDAD_CD" value={equipo.UNIDAD_CD} onChange={handleChange} >
                                                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                                                        <option className="form-control input-group" value="SI">SI</option>
                                                        <option className="form-control input-group" value="NO">NO</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className="col-lg-4 mb-4 ">
                                                    <label htmlFor="floatingInput">Puerto USB</label>
                                                    <select type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_USB" value={equipo.PUERTOS_USB} onChange={handleChange} >
                                                        <option className="form-control input-group" value="" hidden>Seleccion una opción</option>
                                                        <option className="form-control input-group" value="SI">SI</option>
                                                        <option className="form-control input-group" value="NO">NO</option>
                                                    </select>
                                                </div>

                                                <div class="col-lg-4 mb-4 customFile">
                                                    <label htmlFor="customFile">Seleccione una imagen</label>
                                                    <br />
                                                    <input type="file" className="form-control input-group" id="customFile" name="IMAGEN" value={equipo.IMAGEN} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4">
                                                    <label htmlFor="customFile">Seleccione el puesto de trabajo:</label>
                                                    <br />
                                                    <select type="text" className="form-control input-group" id="floatingInput" name="COD_ESTACION" value={equipo.COD_ESTACION} onChange={handleChange} >
                                                        {estaciones}
                                                    </select>
                                                </div>

                                                <div className="col-lg-4 mb-4">
                                                    <label htmlFor="customFile">Comentarios</label>
                                                    <br />
                                                    <textarea type="text" className="form-control input-group" id="customFile" name="COMENTARIOS" value={equipo.COMENTARIOS} onChange={handleChange} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <button className='btn btn-primary'>Siguiente</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <Modal show={showPortatil} onHide={handleClosePortatil} aria-labelledby="ModalHeader">
                        <Modal.Header closeButton>
                            <Modal.Title id="ModalHeader" className='font-weight-bold text-primary'>Portatil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <PortatilForm />
                        </Modal.Body>
                    </Modal>

                    <Modal show={showEscritorio} onHide={handleCloseEscritorio} aria-labelledby="ModalHeader">
                        <Modal.Header closeButton>
                            <Modal.Title id="ModalHeader" className='font-weight-bold text-primary'>Escritorio</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EscritorioForm />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

        </div >
    );
}
export default FormularioEquipo;
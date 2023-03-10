import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

export function AsingToolForm() {

    const cookies = new Cookies();

    const mostrarAlerta = () => {
        swal({
            title: "¡Información Incompleta!",
            text: "¡Rellene todo los Campos!",
            icon: "warning",
            buton: "OK!",
        });
    }

    const mostrarAlertaError = () => {
        swal({
            title: "¡Error!",
            text: "¡La cantidad es superior a la cantidad disponible!",
            icon: "warning",
            buton: "OK!",
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

    const handleLogout = () => {

        cookies.remove('id', { path: "/" });
        cookies.remove('firstName', { path: "/" });
        cookies.remove('lastName', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('rol', { path: "/" });
        cookies.remove('token', { path: "/" });

        window.location.href = './';
    };

    const [data, setData] = useState('');
    const [herramienta, setHerramienta] = useState('');
    const [herram, setHerram] = useState('');
    const [COD_ESTACION, setCOD_ESTACION] = useState('');
    const [COD_HERRAMIENTA, setCOD_HERRAMIENTA] = useState('');
    const [CAN_ASIGNADA, setCantidad] = useState('');

    const handleChange = event => {
        if (event.target.name === 'COD_ESTACION') {
            setCOD_ESTACION(event.target.value);
        }
        if (event.target.name === 'COD_HERRAMIENTA') {
            setCOD_HERRAMIENTA(event.target.value);
        }
        if (event.target.name === 'CAN_ASIGNADA') {
            setCantidad(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!COD_ESTACION || !COD_HERRAMIENTA || !CAN_ASIGNADA) {
            mostrarAlerta();
            return;
        }
        event.preventDefault();
        const data = { COD_ESTACION, COD_HERRAMIENTA, CAN_ASIGNADA };
        console.log(data)
        axios.get(`http://localhost:4000/api/herramienta/${COD_HERRAMIENTA}`)
            .then(res => {
                setHerram(res.data[0]);
                if (CAN_ASIGNADA > res.data[0].CANT_DISPONIBLE) {
                    mostrarAlertaError();
                } else {
                    axios.post('http://localhost:4000/api/asignacion', data)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                    axios.put(`http://localhost:4000/api/asignarCantidad/${COD_HERRAMIENTA}`, { 'CAN_ASIGNADA': CAN_ASIGNADA })
                        .then(res => {
                            mostrarAlertaExito();
                        });
                }
            });
    }

    useEffect(() => {
        fetch("http://localhost:4000/api/estacion_trabajo")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:4000/api/herramienta_disponible")
            .then((response) => response.json())
            .then((data) => {
                setHerramienta(data);
            });
    }, []);

    const estaciones = [];
    estaciones.push(<option className="form-control input-group" hidden >Seleccione la estación</option>)
    for (const estacion of data) {
        estaciones.push(<option className="form-control input-group" value={estacion.COD_ESTACION}>{estacion.NOMBRE_ESTACION}</option>)
    }


    const herramientas = [];
    herramientas.push(<option className="form-control input-group" hidden >Seleccione la herramienta</option>)
    for (const herra of herramienta) {
        herramientas.push(<option className="form-control input-group" value={herra.COD_HERRAMIENTA}>{herra.NOMBRE}</option>)
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
                                <a className="nav-link dropdown-toggle" href="/Tool" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{cookies.get('firstName') + ' ' + cookies.get('lastName')}</span>
                                    <img className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg" alt='imganen' />
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
                                <h6 className="m-0 font-weight-bold text-primary">Asignar herramientas:</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>

                                        <div class="col-lg-4 mb-4">
                                            <label htmlFor="customFile">Seleccione el puesto de trabajo:</label>
                                            <br />
                                            <select className="form-control input-group" id="customFile" name="COD_ESTACION" value={COD_ESTACION} onChange={handleChange}>
                                                {estaciones}
                                            </select>

                                        </div>

                                        <div class="col-lg-4 mb-4">
                                            <label htmlFor="customFile">Seleccione la herramienta:</label>
                                            <br />
                                            <select className="form-control input-group" id="customFile" name="COD_HERRAMIENTA" value={COD_HERRAMIENTA} onChange={handleChange}>
                                                {herramientas}
                                            </select>

                                        </div>
                                    </div>

                                    <div className='row'>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="floatingInput">Cantidad</label>
                                            <input type="number" className="form-control input-group" id="floatingInput" name="CAN_ASIGNADA" value={CAN_ASIGNADA} onChange={handleChange} />
                                        </div>

                                    </div>
                                    <div>
                                        <button className='btn btn-primary' >Agregar</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                    {/*         {/* /.container-fluid */}

                </div >
                {/*         {/* End of Main Content */}
            </div >

            {/* Scroll to Top Button*/}
            < a className="scroll-to-top rounded" href="#page-top" >
                <i className="fas fa-angle-up"></i>
            </a >

        </div>
    );
}
export default AsingToolForm;
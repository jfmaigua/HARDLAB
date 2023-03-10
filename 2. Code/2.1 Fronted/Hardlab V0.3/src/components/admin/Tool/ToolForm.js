import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

export function ToolForm() {

    const cookies = new Cookies();

    const mostrarAlerta = () => {
        swal({
            title: "¡Información Incompleta!",
            text: "¡Rellene todo los Campos!",
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
                window.location.href = './toolRegister';
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
    const [MARCA, setMarca] = useState('');
    const [NOMBRE, setNombre] = useState('');
    const [CANT_DISPONIBLE, setCANT_DISPONIBLE] = useState('');
    const [CODIGO_BARRAS, setCodigoBarras] = useState('');
    const [CANTIDAD, setCantidad] = useState('');
    const [IMAGEN, setImagen] = useState('');
    const [TIPO, setTipo] = useState('');

    const handleChange = event => {
        if (event.target.name === 'MARCA') {
            setMarca(event.target.value);
        }
        if (event.target.name === 'NOMBRE') {
            setNombre(event.target.value);
        }
        if (event.target.name === 'CODIGO_BARRAS') {
            setCodigoBarras(event.target.value);
        }
        if (event.target.name === 'CANTIDAD') {
            setCantidad(event.target.value);
        }
        if (event.target.name === 'IMAGEN') {
            setImagen(event.target.value);
        }
        if (event.target.name === 'CANTIDAD') {
            setCANT_DISPONIBLE(event.target.value);
        }
        if (event.target.name === 'TIPO') {
            setTipo(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!IMAGEN || !NOMBRE || !MARCA || !CANTIDAD || !CODIGO_BARRAS || !TIPO) {
            mostrarAlerta();
            return;
        }
        event.preventDefault();
        console.log(CANT_DISPONIBLE)
        const data = { CANT_DISPONIBLE, IMAGEN, NOMBRE, MARCA, CANTIDAD, CODIGO_BARRAS, TIPO };
        console.log(data)
        axios.post('http://localhost:4000/api/herramienta', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                mostrarAlertaExito();

            })
    }

    useEffect(() => {
        fetch("http://localhost:4000/api/estacion_trabajo")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

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
                                <h6 className="m-0 font-weight-bold text-primary">Agregar una nueva herramienta</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>

                                        <div className="col-lg-6 mb-4 " >
                                            <label htmlFor="floatingInput">Código de barras</label>
                                            <input type="text" className="form-control input-group" id="floatingInput" name="CODIGO_BARRAS" value={CODIGO_BARRAS} onChange={handleChange} />
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="floatingInput">Nombre</label>
                                            <input type="text" className="form-control input-group" id="floatingInput" name="NOMBRE" value={NOMBRE} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className='row'>

                                        <div className="col-lg-6 mb-4 " >
                                            <label htmlFor="floatingInput">Marca</label>
                                            <input type="text" className="form-control input-group" id="floatingInput" name="MARCA" value={MARCA} onChange={handleChange} />
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="floatingInput">Cantidad</label>
                                            <input type="number" className="form-control input-group" id="floatingInput" name="CANTIDAD" value={CANTIDAD} onChange={handleChange} />
                                        </div>

                                    </div>

                                    <div className='row'>

                                        <div class="col-lg-6 mb-4">
                                            <label htmlFor="customFile">Tipo:</label>
                                            <br />
                                            <select className="form-control input-group" id="customFile" name="TIPO" value={TIPO} onChange={handleChange}>
                                            <option className="form-control input-group" hidden>Seleccione el tipo</option>
                                                <option className="form-control input-group">Herramienta</option>
                                                <option className="form-control input-group">Periferico</option>
                                            </select>
                                        </div>

                                        <div className="col-lg-6 mb-4 custom-file">
                                            <label htmlFor="customFile">Seleccione una imagen</label>
                                            <br />
                                            <input type="file" className="custom-file" id="customFile" name="IMAGEN" value={IMAGEN} onChange={handleChange} />

                                        </div>
                                    </div>
                                    <br />
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
export default ToolForm;
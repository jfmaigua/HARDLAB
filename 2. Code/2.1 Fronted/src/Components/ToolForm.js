
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function ToolForm() {

    const [data, setData] = useState('');
    const [MARCA, setMarca] = useState('');
    const [NOMBRE, setNombre] = useState('');    
    const [COD_ESTACION, setCOD_ESTACION] = useState('');
    const [CODIGO_BARRAS, setCodigoBarras] = useState('');
    const [CANTIDAD, setCantidad] = useState('');
    const [IMAGEN, setImagen] = useState('');

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
        if (event.target.name === 'COD_ESTACION') {
            setCOD_ESTACION(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = { COD_ESTACION, IMAGEN, NOMBRE, MARCA, CANTIDAD, CODIGO_BARRAS };
        console.log(data)
        axios.post('/api/herramienta', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    useEffect(() => {
        fetch("/api/estacion_trabajo")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

    const estaciones = [];
    for (const estacion of data) {        
        estaciones.push(<option className="form-control input-group">{estacion.COD_ESTACION}</option>)
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
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                    <img className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg" />
                                </a>
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


                                        <div className="col-lg-6 mb-4">
                                            <label htmlFor="customFile">Seleccione el puesto de trabajo:</label>
                                            <br />
                                            <select className="form-control input-group" id="customFile" name="COD_ESTACION" value={COD_ESTACION} onChange={handleChange}>
                                                {estaciones}
                                            </select>

                                        </div>

                                        <div className="col-lg-6 mb-4 custom-file">
                                            <label htmlFor="customFile">Seleccione una imagen</label>
                                            <br />
                                            <input type="file" className="custom-file" id="customFile" name="IMAGEN" value={IMAGEN} onChange={handleChange} />

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
export default ToolForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';


function FormularioEquipo() {


    const [data, setData] = useState('');
    const cookies = new Cookies();
    const [COD_ESTACION, setCOD_ESTACION] = useState('');
    const [IMAGEN, setIMAGEN] = useState('');
    const [MARCA, setMARCA] = useState('');
    const [FECHA_INGRESO, setFECHA_INGRESO] = useState('');
    const [ESTADO, setESTADO] = useState('');
    const [FECHA_SALIDA, setFECHA_SALIDA] = useState('');

    
    const handleLogout = () => {
  
        cookies.remove('id', {path: "/"});
        cookies.remove('firstName', {path: "/"});
        cookies.remove('lastName', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('rol',  {path: "/"});
        cookies.remove('token',  {path: "/"});        
    
        window.location.href = './';
      };

    const handleChange = event => {
        if (event.target.name === 'IMAGEN') {
            setIMAGEN(event.target.value);
        }
        if (event.target.name === 'MARCA') {
            setMARCA(event.target.value);
        }
        if (event.target.name === 'FECHA_INGRESO') {
            setFECHA_INGRESO(event.target.value);
        }
        if (event.target.name === 'ESTADO') {
            setESTADO(event.target.value);
        }
        if (event.target.name === 'FECHA_SALIDA') {
            setFECHA_SALIDA(event.target.value);
        }
        setCOD_ESTACION(cookies.get('estacionTrabajo'));

        
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!COD_ESTACION || !IMAGEN || !MARCA || !FECHA_INGRESO || !ESTADO || !FECHA_SALIDA) {
            mostrarAlerta();
            return;
        }
        const ingreso = new Date(FECHA_INGRESO).getTime();
        const salida = new Date(FECHA_SALIDA).getTime();
        if (ingreso >= salida) {
            mostrarAlertaFecha();
            return;
        }
        const data = { COD_ESTACION, IMAGEN, MARCA, FECHA_INGRESO, ESTADO, FECHA_SALIDA };
        axios.post('http://localhost:4000/api/equipo', data)
            .then(res => {
                console.log(res.data.id);
                setMARCA('');
                setESTADO('');
                setFECHA_INGRESO('');
                setFECHA_SALIDA('');
                setCOD_ESTACION('');
                setIMAGEN('');
                mostrarAlertaExito();
                
            });
    }

    const mostrarAlerta =() =>{

        swal({
          title:"¡Información Incompleta!", 
          text:"¡Rellene todo los Campos!", 
          icon:"warning", 
          buton:"OK!", 
        });
      
      }
      const mostrarAlertaFecha =() =>{

        swal({
          title:"¡Ocurrio un error!", 
          text:"¡La fecha de ingreso no puede ser mayor o igual a la fecha de salida!", 
          icon:"warning", 
          buton:"OK!", 
        });
      
      }
      

      const mostrarAlertaExito =() =>{

        swal({
          title:"¡Exitoso!", 
          text:"¡Equipo Guardado Exitosamente!", 
          icon:"success", 
          buton:true, 
        })
        .then((value)=>{
            window.location.href = './equipos-usuario';
        });
        
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
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{cookies.get('firstName')+' '+cookies.get('lastName')}</span>
                                    <img className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg" alt='imagen' />
                                </a>
                            </li>
                             {/* Nav Item - Cerrar Sesion */}

                             <li  className="nav-item dropdown no-arrow">
                                <a  className="nav-link dropdown-toggle" href="/" onClick={handleLogout} id="userDropdown" role="button"
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
                                            <h6 className="m-0 font-weight-bold text-primary">Caracteristicas Principales</h6>
                                        </div>
                                        <div className='card-body'>
                                            <div className='row'>

                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Fecha de ingreso</label>
                                                    <input type="date" className="form-control input-group" id="floatingInput" name="FECHA_INGRESO" value={FECHA_INGRESO} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Fecha de salida</label>
                                                    <input type="date" className="form-control input-group" id="floatingInput" name="FECHA_SALIDA" value={FECHA_SALIDA} onChange={handleChange} />
                                                </div>

                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Marca</label>
                                                    <input type="text" className="form-control input-group" id="floatingInput" name="MARCA" value={MARCA} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className="col-lg-4 mb-4 ">
                                                    <label htmlFor="floatingInput">Estado</label>
                                                    <input type="text" className="form-control input-group" id="floatingInput" name="ESTADO" value={ESTADO} onChange={handleChange} />
                                                </div>

                                                <div class="col-lg-4 mb-4 custom-file">
                                                    <label htmlFor="customFile">Seleccione una imagen</label>
                                                    <br />
                                                    <input type="file" className="custom-file" id="customFile" name="IMAGEN" value={IMAGEN} onChange={handleChange} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <button className='btn btn-primary' >Agregar</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
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
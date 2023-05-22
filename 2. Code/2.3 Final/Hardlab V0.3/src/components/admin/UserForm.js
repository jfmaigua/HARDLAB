import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import URIS from '../../config';

export function AddUser() {

    const cookies = new Cookies();

    const mostrarAlerta =() =>{

        swal({
          title:"¡Información Incompleta!", 
          text:"¡Rellene todo los Campos!", 
          icon:"warning", 
          buton:"OK!", 
        });
      
      }

      const mostrarAlertaExito =() =>{

        swal({
          title:"¡Exitoso!", 
          text:"¡Usuario Guardado Exitosamente!", 
          icon:"success", 
          buton:true, 
        })
        .then((value)=>{
            window.location.href = './viewUser';
        });
        
      }
    const handleLogout = () => {
  
      cookies.remove('id', {path: "/"});
      cookies.remove('firstName', {path: "/"});
      cookies.remove('lastName', {path: "/"});
      cookies.remove('username', {path: "/"});
      cookies.remove('rol',  {path: "/"});
      cookies.remove('token',  {path: "/"});        
  
      window.location.href = './';
    };

    const [data, setData] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const [estacionTrabajo, setEstacionTrabajo] = useState('');
    const [showEstacionTrabajo, setShowEstacionTrabajo] = useState(true);
    

    const handleChange = event => {
        if (event.target.name === 'firstName') {
            setFirstName(event.target.value);
        }
        if (event.target.name === 'lastName') {
            setLastName(event.target.value);
        }
        if (event.target.name === 'username') {
            setUsername(event.target.value);
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
        if (event.target.name === 'rol') {
            
            if(event.target.value==='1'){
                setShowEstacionTrabajo(false);
                setEstacionTrabajo(0);
                setRol(event.target.value);
            }else {
                setShowEstacionTrabajo(true);
                setRol(event.target.value);
            }
        }
        if (event.target.name === 'estacionTrabajo') {
            setEstacionTrabajo(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = {  firstName, lastName, username, password, rol, estacionTrabajo };
        console.log(data)
        axios.post(URIS.REGISTRAR, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setFirstName('');
                setLastName('');
                setUsername('');
                setPassword('');
                setEstacionTrabajo('');
                setRol('');
                mostrarAlertaExito();
               
            }).catch(error => {
                
                mostrarAlerta();
            });
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
    estaciones.push(<option className="form-control input-group" >Seleccionar Estacion</option>)
    for (const estacion of data) {

        estaciones.push(<option className="form-control input-group" value={estacion.COD_ESTACION}>{estacion.NOMBRE_ESTACION}</option>)
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
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{cookies.get('firstName')+' '+cookies.get('lastName')}</span>
                                    <img className="img-profile rounded-circle"
                                        src="img/undraw_profile.svg" alt='imganen' />
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
                                <h6 className="m-0 font-weight-bold text-primary">Agregar una nueva herramienta</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>

                                        <div className="col-lg-6 mb-4 " >
                                            <label htmlFor="floatingInput">Nombres</label>
                                            <input type="text" className="form-control input-group" id="floatingInput" name="firstName" value={firstName} onChange={handleChange} />
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="floatingInput">Apellidos</label>
                                            <input type="text" className="form-control input-group" id="floatingInput" name="lastName" value={lastName} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className='row'>

                                        <div className="col-lg-6 mb-4 " >
                                            <label htmlFor="floatingInput">Usuario</label>
                                            <input type="text" className="form-control input-group" id="floatingInput" name="username" value={username} onChange={handleChange} />
                                        </div>

                                        <div className="col-lg-6 mb-4 ">
                                            <label htmlFor="floatingInput">Contraseña</label>
                                            <input type="password" className="form-control input-group" id="floatingInput" name="password" value={password} onChange={handleChange} />
                                        </div>

                                    </div>

                                    <div className='row'>
                                        <div className="col-lg-6 mb-4">
                                            <label htmlFor="rol">Rol</label>
                                            <br />
                                            <select className="form-control" id="rol" name="rol" value={rol} onChange={handleChange}>
                                                <option>Seleccione el Rol</option>
                                                <option value="1">Administrador</option>
                                                <option value="2">Usuario</option>
                                            </select>
                                        </div>


                                        <div className="col-lg-6 mb-4">
                                            <label htmlFor="customFile">Seleccione el puesto de trabajo:</label>
                                            <br />
                                            <select type="text" className="form-control input-group" id="floatingInput" name="estacionTrabajo" value={estacionTrabajo} onChange={handleChange} disabled={!showEstacionTrabajo} >
                                                    {estaciones}
                                            </select>

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
export default AddUser;
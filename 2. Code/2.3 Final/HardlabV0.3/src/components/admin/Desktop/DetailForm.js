import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import URIS from '../../../config';

function DetailForm() {

    const cookies = new Cookies();
    const [data, setData] = useState('');
    const [equipo, setEquipo] = useState('');
    const [COD_EQUIPO, setCOD_EQUIPO] = useState('');
    const [MAIN_BOARD, setMAIN_BOARD] = useState('');
    const [SERIAL, setSERIAL] = useState('');
    const [PROCESADOR, setPROCESADOR] = useState('');
    const [RAM, setRAM] = useState('');
    const [DISCO_DURO, setDISCO_DURO] = useState('');
    const [UNIDAD_CD, setUNIDAD_CD] = useState('');
    const [PUERTOS_PCI_EXPRESS, setPUERTOS_PCI_EXPRESS] = useState('');
    const [PUERTOS_USB, setPUERTOS_USB] = useState('');
    const [PUERTOS_PS2, setPUERTOS_PS2] = useState('');
    const [UNIDAD_DISQUETE, setUNIDAD_DISQUETE] = useState('');
    const [TARJETA_RED, setTARJETA_RED] = useState('');
    const [TARJETA_VIDEO, setTARJETA_VIDEO] = useState('');
    const [PUERTOS_VGA, setPUERTOS_VGA] = useState('');
    const [TARJETA_SONIDO, setTARJETA_SONIDO] = useState('');
    const [COMENTARIOS, setCOMENTARIOS] = useState('');
    const [PUERTOS_PCI, setPUERTOS_PCI] = useState('');

    const handleLogout = () => {
  
        cookies.remove('id', {path: "/"});
        cookies.remove('firstName', {path: "/"});
        cookies.remove('lastName', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('rol',  {path: "/"});
        cookies.remove('token',  {path: "/"});        
    
        window.location.href = './';
      };

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
          text:"¡Detalle de Equipo Guardado Exitosamente!", 
          icon:"success", 
          buton:true, 
        })
        .then((value)=>{
            window.location.href = './desktopView';
        });
        
      }

    const handleChange = event => {


        if (event.target.name === 'COD_EQUIPO') {
            setCOD_EQUIPO(event.target.value);
        }
        if (event.target.name === 'MAIN_BOARD') {
            setMAIN_BOARD(event.target.value);
        }
        if (event.target.name === 'SERIAL') {
            setSERIAL(event.target.value);
        }
        if (event.target.name === 'PROCESADOR') {
            setPROCESADOR(event.target.value);
        }
        if (event.target.name === 'RAM') {
            setRAM(event.target.value);
        }
        if (event.target.name === 'DISCO_DURO') {
            setDISCO_DURO(event.target.value);
        }
        if (event.target.name === 'UNIDAD_CD') {
            setUNIDAD_CD(event.target.value);
        }
        if (event.target.name === 'PUERTOS_PCI_EXPRESS') {
            setPUERTOS_PCI_EXPRESS(event.target.value);
        }
        if (event.target.name === 'PUERTOS_USB') {
            setPUERTOS_USB(event.target.value);
        }
        if (event.target.name === 'PUERTOS_PS2') {
            setPUERTOS_PS2(event.target.value);
        }
        if (event.target.name === 'UNIDAD_DISQUETE') {
            setUNIDAD_DISQUETE(event.target.value);
        }
        if (event.target.name === 'TARJETA_RED') {
            setTARJETA_RED(event.target.value);
        }
        if (event.target.name === 'TARJETA_VIDEO') {
            setTARJETA_VIDEO(event.target.value);
        }
        if (event.target.name === 'PUERTOS_VGA') {
            setPUERTOS_VGA(event.target.value);
        }
        if (event.target.name === 'TARJETA_SONIDO') {
            setTARJETA_SONIDO(event.target.value);
        }
        if (event.target.name === 'COMENTARIOS') {
            setCOMENTARIOS(event.target.value);
        }
        if (event.target.name === 'PUERTOS_PCI') {
            setPUERTOS_PCI(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!COD_EQUIPO || !MAIN_BOARD || !SERIAL || !PROCESADOR || !RAM || !DISCO_DURO||!UNIDAD_CD||!PUERTOS_PCI_EXPRESS||!PUERTOS_USB||!PUERTOS_PS2||!UNIDAD_DISQUETE||!TARJETA_RED||!TARJETA_VIDEO||!PUERTOS_VGA||!TARJETA_SONIDO||!PUERTOS_PCI) {
            mostrarAlerta();
            return;
        }

        const dataDetalle = { COD_EQUIPO, MAIN_BOARD, SERIAL, PROCESADOR, RAM, DISCO_DURO, UNIDAD_CD, PUERTOS_PCI_EXPRESS, PUERTOS_USB, PUERTOS_PS2, UNIDAD_DISQUETE, TARJETA_RED, TARJETA_VIDEO, PUERTOS_VGA, TARJETA_SONIDO, COMENTARIOS, PUERTOS_PCI };
        console.log(dataDetalle.COD_EQUIPO)
        axios.post(URIS.DETALLE, dataDetalle)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setEquipo(res.data);
                mostrarAlertaExito();
                
            })            
            console.log(equipo);        
    }

    useEffect(() => {
        fetch(URIS.EQUIPO)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data);
            });
    }, []);

    const estaciones = [];
    estaciones.push(<option className="form-control input-group" >Seleccionar Equipo</option>)
    for (const estacion of data) {

        estaciones.push(<option className="form-control input-group" value={estacion.COD_EQUIPO}>{estacion.MARCA}</option>)
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
                                        src="img/undraw_profile.svg" alt='imagen'/>
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
                                <h6 className="m-0 font-weight-bold text-primary">Agregar Detalle Equipo</h6>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Detalle</h6>
                                    </div>
                                    <div className='card-body'>
                                        <br />
                                        <div className="col-lg-6 mb-4">
                                            <label htmlFor="customFile">Seleccione Equipo:</label>
                                            <br />
                                            <select type="text" className="form-control input-group" id="floatingInput" name="COD_EQUIPO" value={COD_EQUIPO} onChange={handleChange} >
                                                    {estaciones}
                                            </select>

                                        </div>
                                        <div className='row'>
                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Main board</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="MAIN_BOARD" value={MAIN_BOARD} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Serie</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="SERIAL" value={SERIAL} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Procesador</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PROCESADOR" value={PROCESADOR} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Disco duro</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="DISCO_DURO" value={DISCO_DURO} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Unidad CD</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="UNIDAD_CD" value={UNIDAD_CD} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Puertos USB</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_USB" value={PUERTOS_USB} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Puertos PS</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_PS2" value={PUERTOS_PS2} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Puertos PCI Express</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_PCI_EXPRESS" value={PUERTOS_PCI_EXPRESS} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Unidad de Disquete</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="UNIDAD_DISQUETE" value={UNIDAD_DISQUETE} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Memoria Ram</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="RAM" value={RAM} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Puertos PCI</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_PCI" value={PUERTOS_PCI} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Puertos VGA</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PUERTOS_VGA" value={PUERTOS_VGA} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Tarjeta de Red</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="TARJETA_RED" value={TARJETA_RED} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Tarjeta de Video</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="TARJETA_VIDEO" value={TARJETA_VIDEO} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 nav-item">
                                                <label htmlFor="floatingInput">Tarjeta de Sonido</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="TARJETA_SONIDO" value={TARJETA_SONIDO} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <label>Comentario</label>
                                            <textarea className='form-control' rows="5" name="COMENTARIOS" value={COMENTARIOS} onChange={handleChange} />
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
                {/*         {/* /.container-fluid */}
            </div>
            {/*         {/* End of Main Content */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>
        </div>
    );
}
export default DetailForm;
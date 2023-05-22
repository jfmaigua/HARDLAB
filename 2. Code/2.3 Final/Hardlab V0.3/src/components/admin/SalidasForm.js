import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import URIS from '../../config';

function SalidasForm() {


    const [data, setData] = useState('');
    const cookies = new Cookies();
    const [SERIAL_EQUIPO, setSERIAL_EQUIPO] = useState("")
    const [RAM, setRAM] = useState("")
    const [DISCO, setDISCO] = useState('');
    const [PANTALLA, setPANTALLA] = useState('');
    const [TOUCHPAD, setTOUCHPAD] = useState('');
    const [BATERIA_SERIE, setBATERIA_SERIE] = useState('');
    const [TECLADO, setTECLADO] = useState('');
    const [COMENTARIOS, setCOMENTARIOS] = useState('');

    const handleLogout = () => {

        cookies.remove('id', { path: "/" });
        cookies.remove('firstName', { path: "/" });
        cookies.remove('lastName', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('rol', { path: "/" });
        cookies.remove('token', { path: "/" });

        window.location.href = './';
    };

    const mostrarAlertaExito = () => {
        swal({
            title: "¡Exitoso!",
            text: "¡Equipo Guardado Exitosamente!",
            icon: "success",
            buton: true,
        })
            .then((value) => {
                window.location.href = './desktopView';
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

    const handleChange = event => {
        if (event.target.name === 'RAM') {
            setRAM(event.target.value);
        }
        if (event.target.name === 'DISCO') {
            setDISCO(event.target.value);
        }
        if (event.target.name === 'PANTALLA') {
            setPANTALLA(event.target.value);
        }
        if (event.target.name === 'TOUCHPAD') {
            setTOUCHPAD(event.target.value);
        }
        if (event.target.name === 'BATERIA_SERIE') {
            setBATERIA_SERIE(event.target.value);
        }
        if (event.target.name === 'TECLADO') {
            setTECLADO(event.target.value);
        }
        if (event.target.name === 'COMENTARIOS') {
            setCOMENTARIOS(event.target.value);
        }

        if (event.target.name === 'SERIAL_EQUIPO') {
            setSERIAL_EQUIPO(event.target.value);
        }
    }


    const handleSubmit = event => {
        event.preventDefault();
        if (!SERIAL_EQUIPO || !RAM || !DISCO || !PANTALLA|| !TOUCHPAD || !BATERIA_SERIE|| !TECLADO || !COMENTARIOS) {
            //alert("Por favor, llene todos los campos");
            mostrarAlerta();
            return;
        }
        event.preventDefault();
        const data = {SERIAL_EQUIPO, RAM, DISCO, PANTALLA, TOUCHPAD, BATERIA_SERIE, TECLADO, COMENTARIOS };
        axios.post(URIS.PETICION, data)
            .then(res => {
                console.log(res.data.id);  
                mostrarAlertaExito();
            });
    }

    useEffect(() => {
        fetch(URIS.EQUIPOALTA)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);


    const estaciones = [];
    if (data.length === 1) {
        
        estaciones.push(<option className="form-control input-group" hidden>Seleccione una opcion</option>)        
        estaciones.push(<option className="form-control input-group" value={data[0].SERIAL} selected>{data[0].SERIAL}</option>)        
    }    
    else {
        for (const estacion of data) {
            estaciones.push(<option className="form-control input-group">{estacion.SERIAL}</option>)
        }
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
                            <h6 className="m-0 font-weight-bold text-primary">Agregar Solicitud</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h6 className="m-0 font-weight-bold text-primary">Componentes a solicitar</h6>
                                    </div>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className="col-lg-4 mb-4 " >
                                                <label htmlFor="floatingInput">Serial:</label>
                                                <select type="text" className="form-control input-group" id="floatingInput" name="SERIAL_EQUIPO" value={SERIAL_EQUIPO} onChange={handleChange} >
                                                    {estaciones}
                                                </select>
                                            </div>

                                            <div className="col-lg-4 mb-4 " >
                                                <label htmlFor="floatingInput">RAM</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="RAM" value={RAM} onChange={handleChange} />
                                            </div>

                                            <div className="col-lg-4 mb-4 " >
                                                <label htmlFor="floatingInput">Disco</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="DISCO" value={DISCO} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className='row'>

                                            <div className="col-lg-4 mb-4 " >
                                                <label htmlFor="floatingInput">Pantalla</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="PANTALLA" value={PANTALLA} onChange={handleChange} />
                                            </div>
                                            <div className="col-lg-4 mb-4 ">
                                                <label htmlFor="floatingInput">Touchpad</label>
                                                <input type="text" className="form-control input-group" id="floatingInput" name="TOUCHPAD" value={TOUCHPAD} onChange={handleChange} />
                                            </div>

                                            <div class="col-lg-4 mb-4 custom-file">
                                                <label htmlFor="customFile">Serie bateria</label>
                                                <br />
                                                <input type="text" className="form-control input-group" id="customFile" name="BATERIA_SERIE" value={BATERIA_SERIE} onChange={handleChange} />
                                            </div>

                                        </div>

                                        <div className='row'>

                                            <div class="col-lg-4 mb-4">
                                                <label htmlFor="customFile">Teclado</label>
                                                <br />
                                                <input type="text" className="form-control input-group" id="customFile" name="TECLADO" value={TECLADO} onChange={handleChange} />
                                            </div>

                                            <div class="col-lg-6 mb-4">
                                                <label htmlFor="customFile">Comentarios</label>
                                                <br />
                                                <textarea className="form-control input-group" id="customFile" name="COMENTARIOS" value={COMENTARIOS} onChange={handleChange} />
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
export default SalidasForm;

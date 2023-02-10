import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';


function DesktopForm() {

    const cookies = new Cookies();


    const handleLogout = () => {
  
      cookies.remove('id', {path: "/"});
      cookies.remove('firstName', {path: "/"});
      cookies.remove('lastName', {path: "/"});
      cookies.remove('username', {path: "/"});
      cookies.remove('rol',  {path: "/"});
      cookies.remove('token',  {path: "/"});        
  
      window.location.href = './';
    };
    const [NOMBRE, setNOMBRE] = useState('');

    const handleChange = event => {
        if (event.target.name === 'NOMBRE') {
            setNOMBRE(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = { NOMBRE };
        console.log(data)
        axios.post('http://localhost:4000/api/estacion_trabajo', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                alert("Ageagado con exito");
                window.location.href = './stationView';
            })

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
                                <h6 className="m-0 font-weight-bold text-primary">Agregar una nueva estacion de equipo</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="card shadow mb-4">
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className="col-lg-4 mb-4 " >
                                                    <label htmlFor="floatingInput">Nombre</label>
                                                    <input type="text" className="form-control input-group" id="floatingInput" name="NOMBRE" value={NOMBRE} onChange={handleChange} />
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
                    {/*         {/* /.container-fluid */}

                </div>
                {/*         {/* End of Main Content */}

                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2021</span>
                        </div>
                    </div>
                </footer>
                {/* {/* End of Footer */}

            </div>

            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

        </div >
    );
}
export default DesktopForm;
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';



function PrincipalUser() {

  return (
    <div id="page-top">

      {/* Page Wrapper */}
      <div id="wrapper">

        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

          {/* Sidebar */}
          {/* Sidebar - Brand */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon">
              <img className="logo" src={logo} alt="logo" />
            </div>
            <div className="sidebar-brand-text mx-3"> HARDLAB </div>
          </a>

          {/* Divider */}
          <hr className="sidebar-divider my-0" />

          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <a className="nav-link" href="index.html">
              <i class="fas fa-home"></i>
              <span>Inicio</span></a>
          </li>

          {/* Divider */}
          <hr className="sidebar-divider" />

          {/* Heading */}
          <div className="sidebar-heading">
            Tablas
          </div>

          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseTwo"
              aria-expanded="true" aria-controls="collapseTwo">
              <i className="fas fa-fw fa-cog"></i>
              <span>Herramientas</span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/herremientas-usuario">Ver</Link>
              </div>
            </div>
          </li>

          {/*  {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseUtilities"
              aria-expanded="true" aria-controls="collapseUtilities">
              <i className="fas fa-fw fa-wrench"></i>
              <span>Equipos</span>
            </a>            
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/agregar-equipo">Agregar</Link>     
                <Link className="collapse-item" to="/agregar-detalle-equipo">Agregar Detalle</Link>
                <Link className="collapse-item" to="/equipos-usuario">Ver</Link>          
              </div>
            </div>
          </li>

          {/*  {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseStation"
              aria-expanded="true" aria-controls="collapseStation">
              <i className="fas fa-fw fa-wrench"></i>
              <span>Reporte</span>
            </a>            
            <div id="collapseStation" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded"> 
                <Link className="collapse-item" to="/">Componentes Dañados </Link>    
                <Link className="collapse-item" to="/">Cotizacion Reparación</Link>            
              </div>
            </div>
          </li>          

          


        </ul>
      </div>
    </div>
  );
}

export default PrincipalUser;

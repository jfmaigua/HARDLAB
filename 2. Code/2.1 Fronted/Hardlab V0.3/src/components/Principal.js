import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';



function Principal() {

  return (
    <div id="page-top">

      {/* Page Wrapper */}
      <div id="wrapper">

        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

          {/* Sidebar */}
          {/* Sidebar - Brand */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon">
              <img className="logo" src={logo} alt="" />
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
              <Link className="collapse-item" to="/toolRegister">Agregar</Link>                
                <Link className="collapse-item" to="/asing">Asignar</Link>                
                <Link className="collapse-item" to="/viewTool">Ver Asignaciones</Link>
                <Link className="collapse-item" to="/toolUpdate">Ver</Link>
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
                <Link className="collapse-item" to="/desktopRegister">Agregar</Link>     
                <Link className="collapse-item" to="/addSalida">Agregar Peticion</Link>
                <Link className="collapse-item" to="/desktopView">Ver</Link>          
              </div>
            </div>
          </li>

          {/*  {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseStation"
              aria-expanded="true" aria-controls="collapseStation">
              <i className="fas fa-fw fa-wrench"></i>
              <span>Estaciones de Trabajo</span>
            </a>            
            <div id="collapseStation" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/registerStation">Agregar</Link>  
                <Link className="collapse-item" to="/stationView">Ver</Link>          
              </div>
            </div>
          </li>

          {/*  {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapsePeople"
              aria-expanded="true" aria-controls="collapsePeople">
              <i className="fas fa-fw fa-wrench"></i>
              <span>Usuarios</span>
            </a>            
            <div id="collapsePeople" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <Link className="collapse-item" to="/addUser">Agregar</Link>  
                <Link className="collapse-item" to="/viewUser">Ver</Link>          
              </div>
            </div>
          </li>

          {/*  {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/" data-toggle="collapse" data-target="#collapseReport"
              aria-expanded="true" aria-controls="collapseReport">
              <i className="fas fa-fw fa-wrench"></i>
              <span>Reportes</span>
            </a>            
            <div id="collapseReport" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">  
                <Link className="collapse-item" to="/reportes">Ver</Link>          
              </div>
            </div>
          </li>

                

        </ul>
      </div>
    </div>
  );
}

export default Principal;

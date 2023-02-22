import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardAdmin from "../pages/DashboardAdmin";
import InicioUsuario from "../pages/InicioUsuario";
import Herramientas from "../pages/Herramientas";
import Equipos from "../pages/EquipoUser";
import RegistrarEquipo from "../pages/RegistrarEquipo";
import RegistrarDetalleEquipo from "../pages/RegistrarDetalleEquipo";
import ToolRegister from "../pages/ToolRegister";
import ToolUpdate from "../pages/ToolUpdate";
import DesktopRegsiter from "../pages/DesktopRegister";
import AddDetail from "../pages/AddDetail";
import DesktopsView from "../pages/DesktopsView";
import RegisterStation from "../pages/RegisterStation";
import StationsView from "../pages/StationsView";
import AddUser from "../pages/AddUser";
import UsersView from "../pages/UsersView";
import Error from "../components/Error";
import ReporteEquipos from "../components/admin/Reportes/ReportesEquipos";
import Reports from "../pages/Reports";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/dashboardAdmin" component={DashboardAdmin}/>
      <Route exact path="/inicio-usuario" component={InicioUsuario}/>
      <Route exact path="/herremientas-usuario" component={Herramientas}/>
      <Route exact path="/equipos-usuario" component={Equipos}/>
      <Route exact path="/agregar-equipo" component={RegistrarEquipo}/>
      <Route exact path="/agregar-detalle-equipo" component={RegistrarDetalleEquipo}/>
      <Route exact path="/toolRegister" component={ToolRegister}/>
      <Route exact path="/toolUpdate" component={ToolUpdate}/>
      <Route exact path="/desktopRegister" component={DesktopRegsiter}/>
      <Route exact path="/addDetail" component={AddDetail}/>
      <Route exact path="/desktopView" component={DesktopsView}/>
      <Route exact path="/registerStation" component={RegisterStation}/>
      <Route exact path="/stationView" component={StationsView}/>
      <Route exact path="/addUser" component={AddUser} />
      <Route exact path="/viewUser" component={UsersView} />
      <Route exact path="/error" component={Error} />
      <Route exact path="/reporte-equipo" component={ReporteEquipos} />
      <Route exact path="/reportes" component={Reports} />
      
      
    </Switch>
  </BrowserRouter>
);

export default App;

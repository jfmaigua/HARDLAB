import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import InicioUsuario from "../pages/users/InicioUsuario";
import Herramientas from "../pages/users/Herramientas";
import Equipos from "../pages/users/EquipoUser";
import RegistrarEquipo from "../pages/users/RegistrarEquipo";
import ToolRegister from "../pages/admin/ToolRegister";
import ToolUpdate from "../pages/admin/ToolUpdate";
import DesktopRegsiter from "../pages/admin/DesktopRegister";
import AgregarSalida from "../pages/admin/AgregarSalida";
import DesktopsView from "../pages/admin/DesktopsView";
import RegisterStation from "../pages/admin/RegisterStation";
import StationsView from "../pages/admin/StationsView";
import AddUser from "../pages/admin/AddUser";
import UsersView from "../pages/admin/UsersView";
import Error from "../components/Error";
import ReporteEquipos from "../components/admin/Reportes/ReportesEquipos";
import Reports from "../pages/admin/Reports";
import AddSalida from "../pages/users/AddSalida";
import ReportesComponentes from "../components/admin/Reportes/ReportesComponentes";
import AsingTool from "../pages/admin/AsingTool";
import ViewTool from "../pages/admin/ViewTool";

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
      <Route exact path="/agregar-peticion" component={AddSalida}/>
      <Route exact path="/toolRegister" component={ToolRegister}/>
      <Route exact path="/toolUpdate" component={ToolUpdate}/>
      <Route exact path="/desktopRegister" component={DesktopRegsiter}/>    
      <Route exact path="/desktopView" component={DesktopsView}/>
      <Route exact path="/registerStation" component={RegisterStation}/>
      <Route exact path="/stationView" component={StationsView}/>
      <Route exact path="/addUser" component={AddUser} />
      <Route exact path="/viewUser" component={UsersView} />
      <Route exact path="/error" component={Error} />
      <Route exact path="/asing" component={AsingTool} />      
      <Route exact path="/viewTool" component={ViewTool} />
      <Route exact path="/reporte-equipo" component={ReporteEquipos} />
      <Route exact path="/reporte-componentes" component={ReportesComponentes} />
      <Route exact path="/reportes" component={Reports} />
      <Route exact path="/addSalida" component={AgregarSalida }/>      
      
    </Switch>
  </BrowserRouter>
);

export default App;

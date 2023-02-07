import React from 'react';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import img1 from './img/logo.png';
import Principal from './Components/Principal'
import ToolForm from './Components/ToolForm';
import DesktopForm from './Components/DesktopForm';
import PersonForm from './Components/PersonForm'
import StationForm from './Components/StationForm'
import LogIn from './Components/LogIn';
import ToolsTable from './Components/ToolsTable'
import ToolUpdate from './Pages/ToolUpdate';
import ToolRegister from './Pages/ToolRegister'
import AddDetail from './Pages/AddDetail';
import DesktopRegsiter from './Pages/DesktopRegister';
import DesktopView from './Pages/DesktopView';
import RegisterUser from './Components/RegisterUser';
import RegisterStation from './Pages/RegisterStation';
import PersonView from './Pages/PersonView'
import StationsView from './Pages/StationsView'
import PersonRegister from './Pages/PersonRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/" element={<LogIn/>} />        
        <Route path="/toolUpdate" element={<ToolUpdate/>} />        
        <Route path="/toolRegister" element={<ToolRegister/>} />            
        <Route path="/addDetail" element={<AddDetail/>} />                    
        <Route path="/desktopRegister" element={<DesktopRegsiter/>} />                
        <Route path="/desktopView" element={<DesktopView/>} />                
        <Route path="/register" element={<RegisterUser/>} />                
        <Route path="/personView" element={<PersonView/>} />                                 
        <Route path="/registerPerson" element={<PersonRegister/>} />                       
        <Route path="/stationView" element={<StationsView/>} />                             
        <Route path="/registerStation" element={<RegisterStation/>} />
      </Routes>      
    </BrowserRouter>


  );
}

export default App;

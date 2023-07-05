import React  from 'react';
import Table from 'react-bootstrap/Table';

export const ViewReportComponent = ({ componentes }) => {


  function FormatearFecha(fecha) {
    let fechaFormateada = new Date(fecha);
    return fechaFormateada.toLocaleDateString();
  }


  return (
    <div
      className='container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
    >
      <h1 style={{ color: '#3388af', fontSize: '20px' }}>Informacion Equipos</h1>
      <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CODIGO EQUIPO</th>
            <th>CODIGO DETALLE</th>
            <th>CODIGO ESTACION</th>
            <th>MARCA</th>
            <th>FECHA DE INGRESO</th>
            <th>ESTADO</th>
            <th>FECHA DE SALIDA</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((componente, index) => (
            <tr key={index}>
              <td>{componente.COD_EQUIPO || '...'}</td>
              <td>{componente.COD_DETALLE || '...'}</td>
              <td>{componente.COD_ESTACION || '...'}</td>
              <td>{componente.MARCA || '...'}</td>
              <td>{FormatearFecha(componente.FECHA_INGRESO || '...')}</td>
              <td>{componente.ESTADO || '...'}</td>
              <td>{FormatearFecha(componente.FECHA_SALIDA || '...')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h1 style={{ color: '#3388af', fontSize: '20px' }}>Informacion Detalle de Equipos</h1>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>MAIN BOARD</th>
            <th>SERIAL</th>
            <th>PROCESADOR</th>
            <th>RAM</th>
            <th>DISCO_DURO</th>
            <th>UNIDAD_CD</th>
            <th>PUERTOS PCI EXPRESS</th>
            <th>PUERTOS USB</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((componente, index) => (
            <tr key={index}>
              <td>{componente.MAIN_BOARD || '...'}</td>
              <td>{componente.SERIAL || '...'}</td>
              <td>{componente.PROCESADOR|| '...'}</td>
              <td>{componente.RAM || '...'}</td>
              <td>{componente.DISCO_DURO|| '...'}</td>
              <td>{componente.UNIDAD_CD|| '...'}</td>
              <td>{componente.PUERTOS_PCI_EXPRESS || '...'}</td>
              <td>{componente.PUERTOS_USB || '...'}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>PUERTOS PS2</th>
            <th>UNIDAD DE DISQUETE</th>
            <th>TARJETA DE RED</th>
            <th>TARJETA DE VIDEO</th>
            <th>PUERTOS PCI</th>
            <th>PUERTOS VGA</th>
            <th>TARJETA DE SONIDO</th>
            <th>COMENTARIOS</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((componente, index) => (
            <tr key={index}>
              <td>{componente.PUERTOS_PS2 || '...'}</td>
              <td>{componente.UNIDAD_DISQUETE || '...'}</td>
              <td>{componente.TARJETA_RED|| '...'}</td>
              <td>{componente.TARJETA_VIDEO || '...'}</td>
              <td>{componente.PUERTOS_PCI|| '...'}</td>
              <td>{componente.PUERTOS_VGA|| '...'}</td>
              <td>{componente.TARJETA_SONIDO || '...'}</td>
              <td>{componente.COMENTARIOS || '...'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h1 style={{ color: '#3388af', fontSize: '20px' }}>Informacion Componentes Pedidos</h1>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SERIAL DEL EQUIPO</th>
            <th>DISCO</th>
            <th>PANTALLA</th>
            <th>TOUCHPAD</th>
            <th>BATERIA</th>
            <th>TECLADO</th>
           
          </tr>
        </thead>
        <tbody>
          {componentes.map((componente, index) => (
            <tr key={index}>
              <td>{componente.SERIAL_EQUIPO  || '...'}</td>
              <td>{componente.DISCO || '...'}</td>
              <td>{componente.PANTALLA || '...'}</td>
              <td>{componente.TOUCHPAD || '...'}</td>
              <td>{componente.BATERIA_SERIE || '...'}</td>
              <td>{componente.TECLADO || '...'}</td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>BISAGRAS</th>
            <th>MARCO DE PANTALA</th>
            <th>VENTILADOR</th>
            <th>CASE DISCO DURO</th>
            <th>CASE BASE COVER</th>
            <th>ENCARGADO</th>
           
          </tr>
        </thead>
        <tbody>
          {componentes.map((componente, index) => (
            <tr key={index}>
              <td>{componente.BISAGRAS  || '...'}</td>
              <td>{componente.MARCO_PANTALLA || '...'}</td>
              <td>{componente.VENTILADOR || '...'}</td>
              <td>{componente.CASE_DISCO_DURO|| '...'}</td>
              <td>{componente.CASE_BASE_COVER|| '...'}</td>
              <td>{componente.ENCARGADO|| '...'}</td>
            
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default ViewReportComponent;

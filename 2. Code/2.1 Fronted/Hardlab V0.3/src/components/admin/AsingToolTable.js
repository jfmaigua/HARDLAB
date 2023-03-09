import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ToolsTable() {
    const [data, setData] = useState([]);
    const [estacion, setEstacion] = useState('');
    const [COD_ESTACION, setCOD_ESTACION] = useState('');

    const handleChange = event => {
        if (event.target.name === 'COD_ESTACION') {
            setCOD_ESTACION(event.target.value);
        }
    }

    useEffect(() => {
        axios.get('http://localhost:4000/api/estacion_trabajo')
            .then(res => {
                setEstacion(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        axios.get(`http://localhost:4000/api/herramientas/${COD_ESTACION}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                alert('No se registraron herramientas')
            });
        console.log(data)
    };

    const estaciones = [];
    estaciones.push(<option className="form-control input-group" hidden >Seleccione la estación</option>)
    for (const esta of estacion) {
        estaciones.push(<option className="form-control input-group" value={esta.COD_ESTACION}>{esta.NOMBRE_ESTACION}</option>)
    }


    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Herramientas</h6>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className='form-group row'>
                        <div class="col-lg-6 mb-6">
                            <label htmlFor="codEstacion">Seleccione la herramienta:</label>
                            <br />
                            <select className="form-control" id="codEstacion" name="COD_ESTACION" value={COD_ESTACION} onChange={handleChange}>
                                {estaciones}
                            </select>
                        </div >
                        <div className='col-lg-4 mb-4'>   
                        <br/>                     
                            <button className='btn btn-primary' >Buscar</button>
                        </div>
                    </div>

                </form>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Cantidad</th>
                                <th>Codigo de Barras</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <TableRow key={item.COD_HERRAMIENTA} data={item} />
                            ))}

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );

    function TableRow({ data }) {
        return (
            <tr>
                <td>{data.COD_HERRAMIENTA}</td>
                <td>{data.NOMBRE}</td>
                <td>{data.MARCA}</td>
                <td>{data.CAN_ASIGNADA}</td>
                <td>{data.CODIGO_BARRAS}</td>
            </tr>
        );
    }
}
export default ToolsTable;
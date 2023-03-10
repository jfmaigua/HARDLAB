import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form ,Col} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import { BsArrowLeft,BsArrowRight } from 'react-icons/bs';
function EditForm({ data, handleSave }) {

    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState("");


    const [formData, setFormData] = useState({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        rol: data.rol,
        estacionTrabajo: data.estacionTrabajo
    });



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            
        });
        setSelectedStation(e.target.value);
    }
    
    useEffect(() => {
        // Aquí llamarías a la API para obtener las estaciones
        fetch("http://localhost:4000/api/estacion_trabajo")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setStations(data);
            });
  }, []);


    return (
        <Form>
            <Form.Group controlId="formfirstName">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" name="id" value={formData.id} onChange={handleChange}  disabled />
            </Form.Group>
            <Form.Group controlId="formfirstName">
                <Form.Label>Estacion de Trabajo</Form.Label>
                <Form.Control type="text" name="estacionTrabajo" value={formData.estacionTrabajo} onChange={handleChange}  disabled />
            </Form.Group>
            <Form.Group controlId="formfirstName">
                <Form.Label>Nombres</Form.Label>
                <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange}  />
            </Form.Group>
            <Form.Group controlId="formlastName">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formusername">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formpassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formrol">
                <Form.Label>rol</Form.Label>
                <Form.Control type="text" name="rol" value={formData.rol} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
        
        
        </Form.Group>
            <br />
            <button onClick={() => handleSave(formData)} className='btn btn-success btn-icon-split'>Guardar</button>
        </Form>
    );
}


function UserTable() {
    
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cookies = new Cookies();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    function handlePrevPage() {
      setCurrentPage(currentPage - 1);
    }
  
    function handleNextPage() {
      setCurrentPage(currentPage + 1);
    }
  
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": "Bearer " + cookies.get('token'),
            }
        };

        axios.get('http://localhost:4000/api/list-user', config)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const mostrarAlertaErrror = (id)=>{
        swal({
            title: "Eliminar?",
            text: "Esta seguro de que desea eliminar este Usuario!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Usuario eliminado exitosamente!", {
                icon: "success",
                
              });
              handleDelete(id)
            } else {
              swal("Usuario no Eliminado!");
            }
          });
      }
    
      const mostrarAlertaExito =() =>{
    
        swal({
          title:"¡Exitoso!", 
          text:"¡Usuario Guardada Exitosamente!", 
          icon:"success", 
          buton:true, 
        })
        .then((value)=>{
            window.location.href = './/viewUser';
        });
        
      
      }

    const handleDelete = (id) => {
        const config = {
            headers: {
                "Authorization": "Bearer " + cookies.get('token'),
            }
        };
        axios.delete(`http://localhost:4000/users/${id}`,config)
            .then(res => {
                const updatedData = data.filter(item => item.id !== id);
                console.log(updatedData)
                setData(updatedData);
            })
            .catch(err => {
                console.log(err);
            });
    }


    const handleEdit = (item) => {
        setEditData(item);
        setIsEditing(true);
        setIsModalOpen(true);
    }

    const handleSave = (item) => {
        const config = {
            headers: {
                "Authorization": "Bearer " + cookies.get('token'),
            }
        };
        axios.put(`http://localhost:4000/users/${item.id}`, item,config)
            .then(res => {
                const updatedData = data.map(dataItem => {
                    if (dataItem.id === item.id) {
                        return res.data;
                    }
                    return dataItem;
                });
                setData(updatedData);
                setIsModalOpen(false);
                mostrarAlertaExito();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
    };
    
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Usuarios</h6>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-end mt-3">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-outline-secondary me-2">
                    <BsArrowLeft />
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-outline-secondary">
                    <BsArrowRight />
                    </button>
                </div>
                <br></br>
                <div className="table-responsive">
                <Table striped bordered hover>
                    
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>usuario</th>
                                <th>rol</th>
                                <th>estacionTrabajo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item) => (
                                <TableRow key={item.id} data={item} handleDelete={handleDelete} handleEdit={handleEdit} />
                            ))}

                        </tbody>
                    </Table>
                    
                </div>
            </div>
            <Modal show={isModalOpen} onHide={handleCloseModal} aria-labelledby="ModalHeader">
                <Modal.Header closeButton>
                    <Modal.Title id="ModalHeader">Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm data={editData} handleSave={handleSave}></EditForm>
                </Modal.Body>
            </Modal>

        </div>
    );



function TableRow({ data, handleDelete, handleEdit }) {
    return (
        <tr>
            <td>{data.id}</td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.username}</td>
            <td>{data.rol}</td>
            <td>{data.estacion_nombre}</td>
            <td>
                <button onClick={() => mostrarAlertaErrror(data.id)} className='btn btn-danger btn-icon-split'>Eliminar</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => handleEdit(data)} className='btn btn-warning btn-icon-split'>Editar</button>
            </td>

        </tr>
    );
}
}
export default UserTable;
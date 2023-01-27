import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function LogIn() {

    const navigate = useNavigate()

    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleChange = event => {
        if (event.target.name === 'username') {
            setusername(event.target.value);
        }
        if (event.target.name === 'password') {
            setpassword(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = { username, password };
        console.log(data)

        axios.post('/users/autenticar', data)
            .then(res => {
                console.log("solicitud exitosa")
                navigate("/toolUpdate")
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    setusername('');
                    setpassword('');
                }
            });





    }

    return (
        <div className="bg-gradient-primary">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body">

                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">INICIAR SESIÓN</h1>
                                </div>

                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user"
                                            id="exampleInputEmail" aria-describedby="emailHelp"
                                            placeholder="Usario" name="username" value={username} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Clave" name="password" value={password} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <button className='btn btn-primary btn-user btn-block'>Iniciar</button>
                                    </div>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <Link class="small" to="/register">Crear una cuenta</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default LogIn;
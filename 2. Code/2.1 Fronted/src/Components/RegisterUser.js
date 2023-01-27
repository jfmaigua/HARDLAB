import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function RegisterUser() {

    const [firtsName, setfirtsName] = useState('');
    const [lastName, setlastName] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleChange = event => {
        if (event.target.name === 'username') {
            setusername(event.target.value);
        }
        if (event.target.name === 'password') {
            setpassword(event.target.value);
        }
        if (event.target.name === 'firtsName') {
            setfirtsName(event.target.value);
        }
        if (event.target.name === 'lastName') {
            setlastName(event.target.value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = { username, password };
        console.log(data)

        axios.post('/users/registrar', data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        setusername('');
        setpassword('');
        setlastName('');
        setfirtsName('');


    }

    return (
        <div className="bg-gradient-primary">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body">

                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4"> Registrar una Cuenta</h1>
                                </div>
                                <form class="user" onSubmit={handleSubmit}>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                                placeholder="Nombres" name="firstName" value={firtsName} onChange={handleChange}/>
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control form-control-user" id="exampleLastName"
                                                placeholder="Apellidos" name="lastName" value={lastName} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Usuario" name="username" value={username} onChange={handleChange}/>
                                        </div>
                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Clave" name="password" value={password} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <button href="login.html" class="btn btn-primary btn-user btn-block">
                                        Registrar
                                    </button>
                                </form>
                                <hr />
                                <div class="text-center">
                                    <Link class="small" to="/">Iniciar Sesión</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegisterUser;
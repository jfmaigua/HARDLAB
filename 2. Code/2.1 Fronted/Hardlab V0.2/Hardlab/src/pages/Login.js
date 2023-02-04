import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/index.css';
import Cookies from 'universal-cookie';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        usuario: "",
        password: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/users/autenticar', {
        username: this.state.form.username ,
        password: this.state.form.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.data;
      if (data.error) {
        alert(data.error);
      } else {
          // Guarda la información de inicio de sesión en el almacenamiento 
          //local o en el estado de React
             const cookies = new Cookies();
              cookies.set('id', data.id, {path: "/"});
              cookies.set('firstName', data.firstName, {path: "/"});
              cookies.set('lastName', data.lastName, {path: "/"});
              cookies.set('username', data.username, {path: "/"});
              cookies.set('rol', data.rol, {path: "/"});
              cookies.set('token', data.token, {path: "/"});
              alert(`Bienvenido ${data.firstName} ${data.lastName}`);
              
                  
                  
                  if (data.rol === 1) {
                    window.location.href = './dashboardAdmin';
                    console.log(cookies)
                    } else {
                    window.location.href = './dashboard';
                    console.log(cookies)
                    }
      }
    } catch (err) {
      alert('Usuario o Clave incorrecta');
    }
  };

  render() {
    return (
      <div className="container">
        <div className="loginContainer">
          <img src="../img/logo.png" width={100} height={100} alt="logo"/>
          
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="usuario">
              <h5>Usuario: </h5>
            </label>
            <br />
            <input
              id="user"
              name="username"
              type="text"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <label htmlFor="password">
              <h5>Contraseña: </h5>
            </label>
            <br />
            <input
              id="pwd"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input
              type="submit"
              className="btn btn-success btnLogin"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
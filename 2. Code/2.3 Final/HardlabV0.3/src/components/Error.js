import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Error = () => {
  return (
    <div className="d-flex align-items-center vh-100">
      <div className="text-center w-100">
        <h1 className="display-4">Error</h1>
        <p className="lead">Ha ocurrido un error al acceder a esta página.</p>
        <Link to="/">
          <Button variant="primary">Ir al inicio de sesión</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;

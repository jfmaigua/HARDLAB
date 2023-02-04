import React from 'react';


function Error() {
    
        alert("Ha ocurrido un error, por favor vuelva a iniciar sesión");
        window.location.replace("/");
        
    

    return (
        <h1>Gracias por Visitarnos</h1>
    );
}

export default Error;
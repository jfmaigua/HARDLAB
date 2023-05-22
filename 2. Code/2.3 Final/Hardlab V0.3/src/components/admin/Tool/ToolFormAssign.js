import React, { useState } from 'react';
import axios from 'axios';

function ToolFormAssign() {
  const [toolId, setToolId] = useState('');
  const [quantity, setQuantity] = useState('');

  function addQuantity() {
    // Consulta la tabla de herramientas para obtener la cantidad actual
    axios.get(`http://api.example.com/tools/${toolId}`)
    .then(response => {
      const currentQuantity = response.data.quantity;

      // Compara la cantidad actual con la cantidad que el usuario desea agregar
      if (quantity > currentQuantity) {
        alert('La cantidad que desea agregar es mayor que la cantidad actual');
      } else {
        // Realiza la solicitud a la API para agregar la cantidad
        axios.post('http://api.example.com/add-quantity', {
          toolId: toolId,
          quantity: quantity
        })
        .then(response => {
          console.log(response.data);
          // Actualiza el estado del componente con la respuesta de la API
        })
        .catch(error => {
          console.error(error);
          // Muestra un mensaje de error si la solicitud falla
        });
      }
    })
    .catch(error => {
      console.error(error);
      // Muestra un mensaje de error si la solicitud falla
    });
  }

  return (
    <div>
      <input type="text" value={toolId} onChange={e => setToolId(e.target.value)} />
      <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <button onClick={addQuantity}>Agregar cantidad</button>
    </div>
  );
}

export default ToolFormAssign;
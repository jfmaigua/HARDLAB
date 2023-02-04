import React, { useState } from 'react';

function ToolEdit({ data, handleSave }) {
    const [formData, setFormData] = useState(data);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Herramienta</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="codigo">Código</label>
                                <input type="text" className="form-control" id="codigo" name="COD_HERRAMIENTA" value={formData.COD_HERRAMIENTA} onChange={handleChange} disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="estacion">Estación</label>
                                <input type="text" className="form-control" id="estacion" name="COD_ESTACION" value={formData.COD_ESTACION} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" className="form-control" id="nombre" name="NOMBRE" value={formData.NOMBRE} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="marca">Marca</label>
                                <input type="text" className="form-control" id="marca" name="MARCA" value={formData.MARCA} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cantidad">Cantidad</label>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ToolEdit;
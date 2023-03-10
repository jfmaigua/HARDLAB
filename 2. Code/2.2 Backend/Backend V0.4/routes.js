const express = require('express')
const routes = express.Router()
const validate = require('validate');
const { check, validationResult } = require('express-validator');

routes.get('/list-user', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query('SELECT users.id,users.firstName,users.lastName,users.username,users.rol, IFNULL(estacion_trabajo.NOMBRE_ESTACION, "Todas las Estaciones") as estacion_nombre FROM users LEFT JOIN estacion_trabajo ON users.estacionTrabajo = estacion_trabajo.COD_ESTACION WHERE users.rol <> 0', (err, rows) => {
            if (err) {
                res.status(500).send("Error en la consulta SQL");
                return;
            }

            res.json(rows)
        })
    })
})


routes.get('/detalleequipo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query('SELECT * FROM detalleequipo', (err, rows) => {
            if (err) {
                res.status(500).send("Error en la consulta SQL");
                return;
            }

            res.json(rows)
        })
    })
})
routes.get('/detalleequipo/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }
        const { id } = req.params;
        conn.query('SELECT * FROM detalleequipo WHERE id = ?', [id], (err, rows) => {
            if (err) {
                res.status(500).send("Error al obtner los datos. Intentelo mas tarde");
                return;
            }
            if (rows.length === 0) {
                res.status(404).send("No se encontró el registro con ID " + id);
                return;
            }
            res.json(rows[0])
        })
    })
})
routes.get('/equipoAsignado/:id', [
    check('id').isInt().withMessage('El id debe ser un número entero.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }
        conn.query('SELECT * FROM equipo AS E INNER JOIN estacion_trabajo AS ET ON E.COD_EQUIPO=ET.COD_ESTACION WHERE ET.COD_ESTACION=?', [id], (err, rows) => {
            if (err) {
                res.status(500).send("Error al traer datos porfavor intentelo mas tarde");
                return;
            }
            if (rows.length === 0) {
                res.status(404).send("No se encontraron Equipos asignados al Grupo ");
                return;
            }
            res.json(rows[0])
        })
    })
});


routes.post('/detalleequipo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        console.log(req.body)
        conn.query('INSERT INTO detalleequipo set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            conn.query('SELECT LAST_INSERT_ID() as id', (err, rows) => {
                if (err) return res.send(err)
                res.send({ id: rows[0].id })
            })

        })
    })
})

/*
routes.post(
    '/detalleequipo',
    [
      check('MAIN_BOARD').matches(/^[a-zA-Z0-9]+$/),
      check('SERIAL').matches(/^[a-zA-Z0-9]+$/),
      check('PROCESADOR').matches(/^[a-zA-Z0-9]+$/),
      check('RAM').isNumeric(),
      check('DISCO_DURO').matches(/^[a-zA-Z0-9]+$/),
      check('UNIDAD_CD').isNumeric(),
      check('PUERTOS _USB').isNumeric(),
      check('PUERTOS _PS2').isNumeric(),
      check('UNIDAD_DISQUETE').matches(/^[a-zA-Z0-9]+$/),
      check('TARJETA_RED').matches(/^[a-zA-Z0-9]+$/),
      check('PUERTOS_PCI').matches(/^[a-zA-Z0-9]+$/),
      check('PUERTOS_VGA').matches(/^[a-zA-Z0-9]+$/),
      check('TARJETA_SONIDO').matches(/^[a-zA-Z0-9]+$/),
    ],
    validate,
    (req, res) => {
      req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('INSERT INTO detalleequipo set ?', [req.body], (err, rows) => {
          if (err) return res.send(err);
          res.send('Detalle de equipo añadido!');
        });
      });
    }
  );
*/
routes.delete('/detalleequipo/:COD_DETALLE', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM detalleequipo  WHERE COD_DETALLE = ?', [req.params.COD_DETALLE], (err, rows) => {
            if (err) return res.send(err)

            res.send('Detalle Equipo Eliminado!')
        })
    })
})

routes.put('/detalleequipo/:COD_DETALLE', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE detalleequipo set ? WHERE COD_DETALLE = ?', [req.body, req.params.COD_DETALLE], (err, rows) => {
            if (err) return res.send(err)

            res.send('jugador actualizado!')



        })
    })
})
routes.get('/detalleequipo/:COD_DETALLE', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM detalleequipo WHERE COD_DETALLE = ?', [req.params.COD_DETALLE], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)

        })
    })
})

routes.get('/equipo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM equipo WHERE TIPO = "Portatil" UNION SELECT * FROM equipo WHERE TIPO = "Escritorio"', (err, rows) => {
            if (err) return res.send(err)
        res.json(rows)
    })
})
})
routes.get('/equiposDanados', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM equipo WHERE ESTADO = ? OR ESTADO = ?', ['dañada', 'Dañada'], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/equipoRefactorizar', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM equipo WHERE ESTADO = ? OR ESTADO = ?', ['repotenciar', 'Repotenciar'], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/equipoAsignado/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }
        const { id } = req.params;
        conn.query('SELECT * FROM equipo AS E INNER JOIN estacion_trabajo AS ET ON E.COD_EQUIPO=ET.COD_ESTACION WHERE ET.COD_ESTACION=?', [id], (err, rows) => {
            if (err) {
                res.status(500).send("Error al traer datos porfavor intentelo mas tarde");
                return;
            }
            if (rows.length === 0) {
                res.status(404).send("No se encontraron Equipos asignados al Grupo ");
                return;
            }
            res.json(rows[0])
        })
    })
})
routes.get('/estacion_trabajo/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query(`SELECT * FROM estacion_trabajo WHERE NOMBRE ='${nombre}'`, (err, rows) => {
            if (err) return res.send(err)
            if (rows.length === 0) {
                res.status(404).send("No se encontraron estaciones con el nombre especificado");
                return;
            }
            res.json(rows)
        })
    })
})
routes.get('/informacion_estacion_trabajo/:nombre', (req, res) => {
    const nombre = req.params.nombre;

    req.getConnection((err, conn) => {
        if (err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query(`SELECT ET.NOMBRE AS ESTACION,P.NOMBRE,P.APELLIDO,P.TELEFONO FROM estacion_trabajo AS ET INNER JOIN persona AS P ON ET.COD_ESTACION=P.COD_ESTACION WHERE ET.NOMBRE='${nombre}'`, (err, rows) => {
            if (err) return res.send(err)
            if (rows.length === 0) {
                res.status(404).send("No se encontraron estaciones con el nombre especificado");
                return;
            }
            res.json(rows)
        })
    })
})
routes.get('/equipo/:COD_ESTACION', (req, res) => {
    const codEstacion = req.params.COD_ESTACION;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: 'Error de conexión a la base de datos' })

        const query = `SELECT * FROM equipo WHERE COD_ESTACION = ?`;
        conn.query(query, [codEstacion], (err, rows) => {
            if (err) return res.status(500).send({ error: 'Error en la consulta a la base de datos' })

            if (rows.length === 0) return res.status(404).send({ error: 'No se encontró ninguna herramienta con ese código de estación' })

            res.json(rows)
        })
    })
})

routes.post('/equipo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO equipo set ?', [req.body], (err, rows) => {
            console.log(rows);
            if (err) return res.send(err)
            const equipoId = rows.insertId;
            res.status(201).json({ id: equipoId, message: 'El equipo fue añadido exitosamente!' });
        });
    })
})

routes.post('/escritorio', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO escritorio set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('El equipo fue añadido exitosamente!')
        })
    })
})

routes.post('/portatil', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO portatil set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('El equipo fue añadido exitosamente!')
        })
    })
})


routes.delete('/equipo/:COD_EQUIPO', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM equipo  WHERE COD_EQUIPO = ?', [req.params.COD_EQUIPO], (err, rows) => {
            if (err) return res.send(err)

            res.send('El equipo fue eliminado!')
        })
    })
})

routes.put('/equipo/:COD_EQUIPO', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE equipo set ? WHERE COD_EQUIPO = ?', [req.body, req.params.COD_EQUIPO], (err, rows) => {
            if (err) return res.send(err)

            res.send('El equipo fue actualizado!')
        })
    })
})
routes.get('/equipoDetalle/:COD_EQUIPO', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM equipo WHERE COD_EQUIPO = ?', [req.params.COD_EQUIPO], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

// routes.get('/equipoDetalle/:COD_EQUIPO', (req, res) => {
//     const COD_EQUIPO = req.params.COD_EQUIPO;

//     req.getConnection((err, conn) => {
//         if (err) return res.status(500).send({ error: 'Error de conexión a la base de datos' })

//         const query = `SELECT * FROM equipo INNER JOIN detalleequipo ON equipo.COD_EQUIPO = detalleequipo.COD_EQUIPO WHERE equipo.COD_EQUIPO = ?`;
//         conn.query(query, [COD_EQUIPO], (err, rows) => {
//             if (err) return res.status(500).send({ error: 'Error en la consulta a la base de datos' })

//             if (rows.length === 0) return res.status(404).send({ error: 'No se encontraron resultados para esta consulta' })
//             console.log(rows)
//             res.json(rows)
//         })
//     })
// })

routes.get('/equipoPeticion/:COD_EQUIPO', (req, res) => {
    const COD_EQUIPO = req.params.COD_EQUIPO;

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: 'Error de conexión a la base de datos' })

        const query = `SELECT * FROM equipo INNER JOIN salida_peticion ON salida_peticion.SERIAL_EQUIPO=equipo.SERIAL where equipo.COD_EQUIPO=?`;
        conn.query(query, [COD_EQUIPO], (err, rows) => {
            if (err) return res.status(500).send({ error: 'Error en la consulta a la base de datos' })

            if (rows.length === 0) return res.status(404).send({ error: 'No se encontraron resultados para esta consulta' })
            console.log(rows)
            res.json(rows)
        })
    })
})
routes.get('/equipoPeticion', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.status(500).send({error: 'Error de conexión a la base de datos'})

        const query = `SELECT * FROM equipo INNER JOIN salida_peticion ON equipo.SERIAL = salida_peticion.SERIAL_EQUIPO`;
        conn.query(query, (err, rows)=>{
            if(err) return res.status(500).send({error: 'Error en la consulta a la base de datos'})

            if(rows.length === 0) return res.status(404).send({error: 'No se encontraron resultados para esta consulta'})
            console.log(rows)
            res.json(rows)
        })
    })
})
routes.get('/equipoPeticion/:fechaInicio/:fechaFin', (req, res)=>{
    const fechaInicio = req.params.fechaInicio;
    const fechaFin = req.params.fechaFin;

    req.getConnection((err, conn)=>{
        if(err) return res.status(500).send({error: 'Error de conexión a la base de datos'})

        const query = `SELECT * FROM equipo 
                       INNER JOIN detalleequipo ON equipo.COD_EQUIPO = detalleequipo.COD_EQUIPO 
                       JOIN salida_peticion ON salida_peticion.SERIAL_EQUIPO=detalleequipo.SERIAL
                       WHERE equipo.FECHA_INGRESO BETWEEN ? AND ?`;
        conn.query(query, [fechaInicio, fechaFin], (err, rows)=>{
            if(err) return res.status(500).send({error: 'Error en la consulta a la base de datos'})

            if(rows.length === 0) return res.status(404).send({error: 'No se encontraron resultados para esta consulta'})
            console.log(rows)
            res.json(rows)
        })
    })
})


routes.get('/equipoAlta', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: 'Error de conexión a la base de datos' })
        const query = `SELECT * FROM equipo  WHERE equipo.ESTADO="Repotenciar"`;
        conn.query(query, (err, rows) => {
            if (err) return res.status(500).send({ error: 'Error en la consulta a la base de datos' })
            res.json(rows)
        })
    })
})

routes.post('/peticion', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO salida_peticion set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)
            res.send('El equipo fue añadido exitosamente!')
        })
    })
})

routes.get('/estacion_trabajo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM estacion_trabajo', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/estacion_trabajo', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO estacion_trabajo set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Estacion de Trabajo añadida!')
        })
    })
})

routes.delete('/estacion_trabajo/:COD_ESTACION', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM estacion_trabajo  WHERE COD_ESTACION = ?', [req.params.COD_ESTACION], (err, rows) => {
            if (err) return res.send(err)

            res.send('Estacion de Trabajo Eliminada!')
        })
    })
})

routes.put('/estacion_trabajo/:COD_ESTACION', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE estacion_trabajo set ? WHERE COD_ESTACION = ?', [req.body, req.params.COD_ESTACION], (err, rows) => {
            if (err) return res.send(err)

            res.send('Estacion de Trabajo Actualizada!')
        })
    })
})
routes.get('/estacion_trabajo/:COD_ESTACION', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM estacion_trabajo WHERE COD_ESTACION = ?', [req.params.COD_ESTACION], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/herramienta', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM herramienta', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/herramienta_disponible', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM herramienta WHERE CANT_DISPONIBLE > 0;', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/herramientas/:COD_ESTACION', (req, res) => {
    const codEstacion = req.params.COD_ESTACION;
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send({ error: 'Error de conexión a la base de datos' })

        const query = `SELECT * FROM asignacion_herramienta h JOIN estacion_trabajo e ON h.COD_ESTACION = e.COD_ESTACION JOIN herramienta ON h.COD_HERRAMIENTA = herramienta.COD_HERRAMIENTA WHERE h.COD_ESTACION=?`;
        conn.query(query, [codEstacion], (err, rows) => {
            if (err) return res.status(500).send({ error: 'Error en la consulta a la base de datos' })

            if (rows.length === 0) return res.status(404).send({ error: 'No se encontró ninguna herramienta con ese código de estación' })

            res.json(rows)
        })
    })
})

routes.post('/asignacion', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO asignacion_herramienta set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Herramienta Añadida!')
        })
    })
})

routes.post('/herramienta', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO herramienta set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Herramienta Añadida!')
        })
    })
})

routes.delete('/herramienta/:COD_HERRAMIENTA', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM herramienta  WHERE COD_HERRAMIENTA = ?', [req.params.COD_HERRAMIENTA], (err, rows) => {
            if (err) return res.send(err)

            res.send('Herramienta Eliminada!')
        })
    })
})

routes.put('/herramienta/:COD_HERRAMIENTA', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE herramienta set ? WHERE COD_HERRAMIENTA = ?', [req.body, req.params.COD_HERRAMIENTA], (err, rows) => {
            if (err) return res.send(err)

            res.send('Herramienta Actualizada!')
        })
    })
})

routes.put('/asignarCantidad/:COD_HERRAMIENTA', (req, res) => {
    const { COD_HERRAMIENTA } = req.params;
    const { CANTIDAD } = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({ error: 'Error al conectar con la base de datos.' });
        }


        const cantidad = parseInt(CANTIDAD);        
        const query = 'UPDATE herramienta SET CANT_DISPONIBLE = GREATEST(CANT_DISPONIBLE - ?, 0) WHERE COD_HERRAMIENTA = ?';

        conn.query(query, [cantidad, COD_HERRAMIENTA], (err, result) => {
            if (err) {
                return res.status(500).send({ error: 'Error al actualizar la cantidad de la herramienta.' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).send({ error: 'No se encontró la herramienta especificada.' });
            }

            return res.status(200).send({ message: 'Cantidad de herramienta actualizada exitosamente.' });
        });
    });
});

routes.get('/herramienta/:COD_HERRAMIENTA', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM herramienta WHERE COD_HERRAMIENTA = ?', [req.params.COD_HERRAMIENTA], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/persona', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        conn.query('SELECT * FROM persona', (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/persona', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('INSERT INTO persona set ?', [req.body], (err, rows) => {
            if (err) return res.send(err)

            res.send('Persona Añadida!')
        })
    })
})

routes.delete('/persona/:COD_PERSONA', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('DELETE FROM persona  WHERE COD_PERSONA = ?', [req.params.COD_PERSONA], (err, rows) => {
            if (err) return res.send(err)

            res.send('Persona Eliminada!')
        })
    })
})

routes.put('/persona/:COD_PERSONA', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('UPDATE persona set ? WHERE COD_PERSONA = ?', [req.body, req.params.COD_PERSONA], (err, rows) => {
            if (err) return res.send(err)

            res.send('Persona Actualizada!')
        })
    })
})
routes.get('/persona/:COD_PERSONA', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query('SELECT * FROM persona WHERE COD_PERSONA = ?', [req.params.COD_PERSONA], (err, rows) => {
            if (err) return res.send(err)
            res.json(rows)
        })
    })
})


module.exports = routes
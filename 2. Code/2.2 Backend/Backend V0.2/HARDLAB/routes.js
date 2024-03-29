const express = require('express')
const routes = express.Router()
const validate = require('validate');
const { check, validationResult } = require('express-validator');

routes.get('/detalleequipo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query('SELECT * FROM detalleequipo', (err, rows)=>{
            if(err) {
                res.status(500).send("Error en la consulta SQL");
                return;
            }
            
            res.json(rows)
        })
    })
})
routes.get('/detalleequipo/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }
        const { id } = req.params;
        conn.query('SELECT * FROM detalleequipo WHERE id = ?', [id], (err, rows)=>{
            if(err) {
                res.status(500).send("Error al obtner los datos. Intentelo mas tarde");
                return;
            }
            if(rows.length === 0) {
                res.status(404).send("No se encontró el registro con ID " + id);
                return;
            }
            res.json(rows[0])
        })
    })
})
routes.get('/equipoAsignado/:id', [
    check('id').isInt().withMessage('El id debe ser un número entero.')
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    req.getConnection((err, conn)=>{
        if(err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }
        conn.query('SELECT * FROM equipo AS E INNER JOIN estacion_trabajo AS ET ON E.COD_EQUIPO=ET.COD_ESTACION WHERE ET.COD_ESTACION=?', [id], (err, rows)=>{
            if(err) {
                res.status(500).send("Error al traer datos porfavor intentelo mas tarde");
                return;
            }
            if(rows.length === 0) {
                res.status(404).send("No se encontraron Equipos asignados al Grupo ");
                return;
            }
            res.json(rows[0])
        })
    })
});


routes.post('/detalleequipo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        console.log(req.body)
        conn.query('INSERT INTO detalleequipo set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            conn.query('SELECT LAST_INSERT_ID() as id', (err, rows) => {
                if(err) return res.send(err)
                res.send({ id: rows[0].id })})
                
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
routes.delete('/detalleequipo/:COD_DETALLE', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM detalleequipo  WHERE COD_DETALLE = ?', [req.params.COD_DETALLE], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Detalle Equipo Eliminado!')
        })
    })
})

routes.put('/detalleequipo/:COD_DETALLE', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE detalleequipo set ? WHERE COD_DETALLE = ?', [req.body, req.params.COD_DETALLE], (err, rows)=>{
            if(err) return res.send(err)

                res.send('jugador actualizado!')
            

            
        })
    })
})
routes.get('/detalleequipo/:COD_DETALLE', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM detalleequipo WHERE COD_DETALLE = ?', [req.params.COD_DETALLE], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
            
        })
    })
})

routes.get('/equipo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM equipo', (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})
routes.get('/equipoAsignado/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }
        const { id } = req.params;
        conn.query('SELECT * FROM equipo AS E INNER JOIN estacion_trabajo AS ET ON E.COD_EQUIPO=ET.COD_ESTACION WHERE ET.COD_ESTACION=?', [id], (err, rows)=>{
            if(err) {
                res.status(500).send("Error al traer datos porfavor intentelo mas tarde");
                return;
            }
            if(rows.length === 0) {
                res.status(404).send("No se encontraron Equipos asignados al Grupo ");
                return;
            }
            res.json(rows[0])
        })
    })
})
routes.get('/estacion_trabajo/:nombre', (req, res)=>{
    const nombre = req.params.nombre;

    req.getConnection((err, conn)=>{
        if(err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query(`SELECT * FROM estacion_trabajo WHERE NOMBRE ='${nombre}'`, (err, rows)=>{
            if(err) return res.send(err)
            if(rows.length === 0) {
                res.status(404).send("No se encontraron estaciones con el nombre especificado");
                return;
            }
            res.json(rows)
        })
    })
})
routes.get('/informacion_estacion_trabajo/:nombre', (req, res)=>{
    const nombre = req.params.nombre;

    req.getConnection((err, conn)=>{
        if(err) {
            res.status(500).send("Error al conectarse a la base de datos");
            return;
        }

        conn.query(`SELECT ET.NOMBRE AS ESTACION,P.NOMBRE,P.APELLIDO,P.TELEFONO FROM estacion_trabajo AS ET INNER JOIN persona AS P ON ET.COD_ESTACION=P.COD_ESTACION WHERE ET.NOMBRE='${nombre}'`, (err, rows)=>{
            if(err) return res.send(err)
            if(rows.length === 0) {
                res.status(404).send("No se encontraron estaciones con el nombre especificado");
                return;
            }
            res.json(rows)
        })
    })
})
routes.get('/equipo/:COD_ESTACION', (req, res)=>{
    const codEstacion = req.params.COD_ESTACION;

    req.getConnection((err, conn)=>{
        if(err) return res.status(500).send({error: 'Error de conexión a la base de datos'})

        const query = `SELECT * FROM equipo WHERE COD_ESTACION = ?`;
        conn.query(query, [codEstacion], (err, rows)=>{
            if(err) return res.status(500).send({error: 'Error en la consulta a la base de datos'})

            if(rows.length === 0) return res.status(404).send({error: 'No se encontró ninguna herramienta con ese código de estación'})

            res.json(rows)
        })
    })
})



routes.post('/equipo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO equipo set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('El equipo fue añadido exitosamente!')
        })
    })
})

routes.delete('/equipo/:COD_EQUIPO', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM equipo  WHERE COD_EQUIPO = ?', [req.params.COD_EQUIPO], (err, rows)=>{
            if(err) return res.send(err)

            res.send('El equipo fue eliminado!')
        })
    })
})

routes.put('/equipo/:COD_EQUIPO', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE equipo set ? WHERE COD_EQUIPO = ?', [req.body, req.params.COD_EQUIPO], (err, rows)=>{
            if(err) return res.send(err)

            res.send('El equipo fue actualizado!')
        })
    })
})
routes.get('/equipo/:COD_EQUIPO', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM equipo WHERE COD_EQUIPO = ?', [req.params.COD_EQUIPO], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})


routes.get('/estacion_trabajo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM estacion_trabajo', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/estacion_trabajo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO estacion_trabajo set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Estacion de Trabajo añadida!')
        })
    })
})

routes.delete('/estacion_trabajo/:COD_ESTACION', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM estacion_trabajo  WHERE COD_ESTACION = ?', [req.params.COD_ESTACION], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Estacion de Trabajo Eliminada!')
        })
    })
})

routes.put('/estacion_trabajo/:COD_ESTACION', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE estacion_trabajo set ? WHERE COD_ESTACION = ?', [req.body, req.params.COD_ESTACION], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Estacion de Trabajo Actualizada!')
        })
    })
})
routes.get('/estacion_trabajo/:COD_ESTACION', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM estacion_trabajo WHERE COD_ESTACION = ?', [req.params.COD_ESTACION], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})


routes.get('/herramienta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM herramienta', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.get('/herramienta/:COD_ESTACION', (req, res)=>{
    const codEstacion = req.params.COD_ESTACION;

    req.getConnection((err, conn)=>{
        if(err) return res.status(500).send({error: 'Error de conexión a la base de datos'})

        const query = `SELECT * FROM herramienta WHERE COD_ESTACION = ?`;
        conn.query(query, [codEstacion], (err, rows)=>{
            if(err) return res.status(500).send({error: 'Error en la consulta a la base de datos'})

            if(rows.length === 0) return res.status(404).send({error: 'No se encontró ninguna herramienta con ese código de estación'})

            res.json(rows)
        })
    })
})


routes.post('/herramienta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO herramienta set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Herramienta Añadida!')
        })
    })
})

routes.delete('/herramienta/:COD_HERRAMIENTA', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM herramienta  WHERE COD_HERRAMIENTA = ?', [req.params.COD_HERRAMIENTA], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Herramienta Eliminada!')
        })
    })
})

routes.put('/herramienta/:COD_HERRAMIENTA', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE herramienta set ? WHERE COD_HERRAMIENTA = ?', [req.body, req.params.COD_HERRAMIENTA], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Herramienta Actualizada!')
        })
    })
})
routes.get('/herramienta/:COD_HERRAMIENTA', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM herramienta WHERE COD_HERRAMIENTA = ?', [req.params.COD_HERRAMIENTA], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})


routes.get('/persona', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM persona', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/persona', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO persona set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Persona Añadida!')
        })
    })
})

routes.delete('/persona/:COD_PERSONA', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM persona  WHERE COD_PERSONA = ?', [req.params.COD_PERSONA], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Persona Eliminada!')
        })
    })
})

routes.put('/persona/:COD_PERSONA', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE persona set ? WHERE COD_PERSONA = ?', [req.body, req.params.COD_PERSONA], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Persona Actualizada!')
        })
    })
})
routes.get('/persona/:COD_PERSONA', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('SELECT * FROM persona WHERE COD_PERSONA = ?', [req.params.COD_PERSONA], (err, rows)=>{
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})


module.exports = routes
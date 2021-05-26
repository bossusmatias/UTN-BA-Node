

/** UPDATE PERSONAS */
// const updatePersonas = (req, res, next) => {

//   try {
//         if (!req.body.nombre) {
//             throw new Error('Nombre Vacio');
//         }

//         let query = 'SELECT id FROM personas WHERE nombre = ? AND id <> ?';
//         let respuesta = await qy (query, [req.body.nombre, req.params.id]);

//         if (respuesta.lenght > 0) {
//             throw new Error ('Esa Persona ya Existe');
//         }

//         query = 'UPDATE personas SET nombre = ? WHERE id= ?';
//         respuesta = await qy(query, [req.body.nombre, req.params.id]);
//         res.status(200).send({'Respuesta': respuesta}); 
//   }    

//   catch(err) {
//       console.error(err.message);
//       res.status(413).send({"Error": err.message});
//   }

// };


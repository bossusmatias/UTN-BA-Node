const db = require('../db-conection'); 


/** GET LIBROS */
const getLibros = async (req, res, next) => {

  try {
    const respuesta = await db.query('SELECT * FROM libros');
    res.status(200).send({"respuesta": respuesta});

  } catch(err) {
  	  res.status(413).send({"Error": err.message});
			console.log(err);
		}

};

/** GET LIBROS POR ID */
const getLibroPorId = async (req, res, next) => {

  const libroId = req.params.id;

  try {
    const respuesta = await db.query('SELECT * FROM libros WHERE id = (?)', [libroId]);

    if (respuesta == '') {
        throw new Error ('No encontramos ningun libro con ese ID');
    } 
    
    else {
        res.status(200).send({"respuesta": respuesta});
    }
        
  } catch(err) {
			console.error(err.message);
			res.status(413).send({"Error": err.message});
		}

};


/** POST LIBRO */
const postLibro = async (req, res, next) => {
  
  const { nombre, description, categoriaId, personaId } = req.body; 

  try {

			if( !nombre || !description || !categoriaId || !personaId ) {

				throw new Error("Se necesitan el nombre, descripcion Categoria ID y Persona ID");
			}

      let respuesta = await db.query("SELECT COUNT(*) as count FROM libros WHERE nombre = (?)", [nombre]);

			if(respuesta[0].count == 0) {

				respuesta = await db.query("INSERT INTO libros (nombre, descripcion, categoria_id, persona_id) VALUES (?, ?, ?, ?)", [nombre, description, categoriaId, personaId]);
				res.status(201).send({"Error": "El libro se ha insertado correctamente!"});

			} else {
					throw new Error("Ese libro ya existe");
			}
	
  } catch(err) {
      console.error(err.message);
      res.status(413).send({"Error": err.message});
  } 

};

/** UPDATE LIBRO */
const updateLibro = async (req, res, next) => {

	const libroId = req.params.id; // if empty undefinied
	const { nombre, description, categoriaId, personaId } = req.body; 

  try {

	  if(!libroId || !nombre) {
			throw new Error ('Tanto el ID del libro como el nombre son necesarios');
	  }

	  const respuesta = await db.query('UPDATE libros SET nombre = (?), descripcion = (?), categoria_id = (?), persona_id = (?) WHERE id = (?)', [nombre, description, categoriaId, personaId, libroId]);

	  console.log(respuesta);

	  res.status(200).send({'Se Agrego correctamene id': respuesta.insertId});

  } catch(err) {

			console.error(err.message);
			res.status(413).send({"Error": err.message});
  }
};


/** DELETE LIBRO */
const deleteLibro = async (req, res, next) => {
 
  const libroId = req.params.id; // if empty undefinied

  try {

	  const data = await db.query('DELETE FROM libros WHERE id = (?)', [libroId]);
		console.log(data);

	  if (!data.affectedRows == 0) {
		  throw new Error ("El libro fue borrado");
	  } else {
			res.status(200).send({"Error": 'No se ha borrado ningun libro con ese ID'});
		}

  } catch(err) {
			console.error(err.message);
			res.status(413).send({"Error": err.message});
  }
};

exports.getLibros = getLibros;
exports.getLibroPorId = getLibroPorId;
exports.postLibro = postLibro;
exports.updateLibro = updateLibro;
exports.deleteLibro = deleteLibro;
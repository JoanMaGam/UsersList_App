const router = require('express').Router();

const User = require('../../src/models/user.model')

router.post('/sync', async (req, res) => {

  try {

    //Consumo la API y obtengo usuarios
    const response = await fetch('https://jsonplaceholder.typicode.com/users', { method: 'GET' });
    const data = await response.json();

    //Guardo en la BD a cada usuario de la Api siguiendo el objeto modelo.
    for (let item of data) {
      try {
        // Buscar el usuario por su email único para ver si existe
        const usuarioExistente = await User.findOne({ email: item.email });

        if (usuarioExistente) {
          // Actualizar datos del usuario existente
          await User.updateOne({ email: item.email }, { name: item.name, username: item.username, email: item.email, external_id: item.id, address: item.address });
        } else {
          // Crear un nuevo usuario si no existe
          await User.create({
            name: item.name,
            username: item.username,
            email: item.email,
            external_id: item.id,
            address: item.address
          })
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
      };
    };

    //Recupero la lista de usuarios de la BD
    const users = await User.find();

    res.status(200).json({
      mensaje: "Sincronización exitosa",
      users: users
    });

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
  };
});


router.get('/users', async (req, res) => {

  try {
    const users = await User.find();
    res.json(users);

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
  };
});


router.put('/users', async (req, res) => {

  try {
    const usuarioExistente = await User.findOne({ email: req.body.email });

    !usuarioExistente
      ?
      res.json(await User.create(req.body))
      :
      res.json({ 'fatal': 'Este usuario ya existe.' });

  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
    res.status(500).json({ error: 'Hubo un error al procesar la solicitud' });
  };
});

module.exports = router;
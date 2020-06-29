var express = require('express');
var router = express.Router();

var provincias_controller = require('../controllers/provinciasController');

// JADE fue reemplazado por el motor de plantillas PUG, express generator viene con jade por defecto. habria
// que cambiarlo.

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
  provincias_controller.mostrarInfo(req.body.nombreProv)
    .then((datos) => { 
      datos = datos.provincias[0];
      res.render('index', { desc: 'Revisar consola de node', 
                            idProvincia: datos.id,
                            nombreProvincia: datos.nombre,
                            latitudProvincia: datos.centroide.lat,
                            longitudProvincia: datos.centroide.lon
                          }
      );
    })
});

module.exports = router;

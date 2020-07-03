# REST API con JSON

## REST
Empleando una breve definición, una REST API es cualquier interfaz entre sistemas que utilice el protocolo HTTP para obtener datos u operar sobre esos datos en formatos como **JSON** o **XML**. Se puede considerar una alternativa a otros protocolos como SOAP.

## JSON
JSON es acrónimo de **J**ava**s**cript **O**bject **N**otation, y es un formato de texto para intercambio de datos.

Para el ejemplo publicado en este repositorio se va a utilizar la API del Servicio de Normalización de Datos Geográficos de Argentina (https://datosgobar.github.io/georef-ar-api/). 
En la misma documentación de la API se ve un ejemplo de como se ve un fragmento del JSON utilizado:

```JSON
{
    "provincias": [
        {
            "nombre": "Santiago del Estero",
            "id": "86",
            "centroide": {
                "lat": -27.782412,
                "lon": -63.252387
            }
        }
    ],
    "cantidad": 1,
    "total": 1,
    "inicio": 0,
    "parametros": { ... }
}
```

Mediante **node.js** y el módulo node-fetch (https://www.npmjs.com/package/node-fetch) podemos trabajar con los datos obtenidos.
### routes/index.js
```javascript
var provincias_controller = require('../controllers/provinciasController'); // llamado al controlador

router.post('/', function(req, res) {
  provincias_controller.mostrarInfo(req.body.nombreProv)
    .then((datos) => { 
      datos = datos.provincias[0]; // se toman los datos de la primera posición del arreglo 'provincias' dentro del objeto JSON.
      // se renderizan los datos para mostrarlos en la vista, mediante variables:
      res.render('index', { desc: 'Revisar consola de node', 
                            idProvincia: datos.id,
                            nombreProvincia: datos.nombre,
                            latitudProvincia: datos.centroide.lat,
                            longitudProvincia: datos.centroide.lon
                          }
      );
    })
});
```

### provinciasController.js
```javascript
const fetch = require('node-fetch'); // importamos el módulo

const URL_BASE = "https://apis.datos.gob.ar/georef/api/provincias?nombre=";
const CONFIG = { method: "Get" }; // aca tambien se pueden configurar los cabezales y demas cosas 
const prov = {};

const mostrarInfo = async(provincia) => { // este modulo se exporta al metodo post en routes/index.js
    let url = URL_BASE + provincia;
    let respuesta; 

    await fetch(url, CONFIG) // promesa
    .then(response => respuesta = response.json())
    .then(datosJson => {
        console.log("\n*** DATOS OBTENIDOS ***");
        console.log(datosJson);
        console.log("*************\n");
    })
    .catch(error => { 
        // se podrian especificar los tipos de errores. por ej "undefined" probablemente es que la provincia
        // no exista.
        console.log("Ocurrió un error: ", error); 
    })
    return respuesta;
}

prov.mostrarInfo = mostrarInfo;
module.exports = prov;
```

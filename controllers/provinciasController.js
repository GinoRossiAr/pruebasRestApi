const fetch = require('node-fetch');

const URL_BASE = "https://apis.datos.gob.ar/georef/api/provincias?nombre=";
const CONFIG = { method: "Get" }; // aca se configuran tambien los cabezales 
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
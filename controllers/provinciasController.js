const fetch = require('node-fetch');

const URL_BASE = "https://apis.datos.gob.ar/georef/api/provincias?nombre=";
const CONFIG = { method: "Get" }; // aca se configuran tambien los cabezales 

exports.mostrarInfo = (provincia) => { // este modulo se exporta al metodo post en routes/index.js
    let url = URL_BASE + provincia;

    fetch(url, CONFIG) // promesa
    .then(response => response.json())
    .then(datosJson => {
        console.log("\n*** DATOS ***");
        console.log("ID de la provincia: ", datosJson.provincias[0].id);
        console.log("Nombre de la provincia: ", datosJson.provincias[0].nombre);
        console.log("Latitud de la provincia: ", datosJson.provincias[0].centroide.lat);
        console.log("Longitud de la provincia: ", datosJson.provincias[0].centroide.lon);
        console.log("*************\n");
        return true;
    })
    .catch(error => { 
        // se podrian especificar los tipos de errores. por ej "undefined" probablemente es que la provincia
        // no exista.
        console.log("Ocurrió un error: ", error); 
        return false;
    })
}
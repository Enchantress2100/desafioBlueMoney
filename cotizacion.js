const https = require('https')
const fs = require('fs')
const child_process = require('child_process')

//recibir por linea de comandos los argumentos
const argumentos = process.argv.slice(2)
const archivo = (argumentos[0])
const extensionArchivo = (argumentos[1])
const indicador = (argumentos[2])
const cantidadPesos = (argumentos[3])
let dineroCambiado= (argumentos[4])
const fecha = new Date()


//prueba
console.log(`${archivo}`) //pesos
console.log(`${extensionArchivo}`) //pdf
console.log(`${indicador}`) //dolar
console.log(`${cantidadPesos}`) //250000

//llamada a la api y almacenar el resultado en una variable
https.get('https://mindicador.cl/api', function (res) {
    res.setEncoding('utf-8');
    var data = '';
 
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var mindicador = JSON.parse(data);
        dineroCambiado = cantidadPesos / mindicador[indicador].valor;
        console.log(dineroCambiado)

//crear un archivo con el modulo fs usando los argumentos.
    let dataFinal = `A la fecha: ${fecha} fue realizada cotización con los siguientes datos: Cantidad de pesos a convertir: ${cantidadPesos} pesos. Este valor convertido a ${indicador} da un total de ${dineroCambiado}`
    
    fs.writeFile(`${archivo}.${extensionArchivo}`, dataFinal, (err) => {
        if (err)
            console.log(err);
        else {
            console.log('archivo creado con exito')
        }
        //texto es el contenido del archivo.
        //leer archivo y mandar el contenido por consola.
        fs.readFile(`${archivo}.${extensionArchivo}`,'utf-8', function read (err, texto) {
            if (err) {
                throw err;
            }
            console.log(texto)
        })
    })
    });
}).on('error', function (err) {
    console.log('Error al consumir la API!');
})





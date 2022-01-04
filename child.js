const exec = require('child_process').exec
exec('node cotizacion.js pesos pdf dolar 250000', function (err, stdout, stderr) {
    console.log(stdout)
})

//se crea una constante para inicializar el child process, se coloca la informacion con la que se trabajará.
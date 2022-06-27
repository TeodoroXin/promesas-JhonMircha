'use strict';
let fs = require('fs'),
    file = './assets/nombres.txt',
    copia = './assets/nombres-promises-es6.txt';
/***
Convertí todas las funciones secundarias a "Expresiones de función" las cuales devolvían cada una sus respectivas promesas,
se entiende implicitamente que las "Function Expressions" no necesitan la palabra "return" cuando contiene un solo resultado su interior;
seguí el mismo método de la primera que hizo Jhonatan.
***/
// f: https://www.youtube.com/watch?v=3lPyqtRK1GA&list=PLvq-jIkSeTUY3gY-ptuqkNEXZHsNwlkND&index=29
const archivoExiste = new Promise( (resolve, reject) => {
  console.log('revisando archivo')
    fs.access(file, fs.F_OK, function (err) {
      return (err) ? reject( new Error('El archivo no existe')) : resolve(true)
  })
})

const leeArchivo = (dataPromise) => new Promise( (resolve, reject) => {
  console.log('Leyendo archivo')
  fs.readFile(file, function(err, data) {
    return (err) ? reject( new Error('El archivo no se pudo leer')) : resolve(data)
  })
})
// Simplemente hace lo que dice: Revisa si existe una copia anteriormente hecha por esta misma aplicación.
const evitaSobreescritura = (dataPromise) => new Promise( (resolve, reject) => {
  fs.readFile(copia, function(err, data) {
    return (err) ?
    (console.log('¿Archivo inexistente?: Permiso para copiar concedido'),  resolve(dataPromise) ) : reject( new Error('Error: Ya existe una copia!') )
  })
})

const copiaArchivo = (dataPromise) => new Promise((resolve, reject) => {
  console.log('Copiando archivo...')
  fs.writeFile(copia, dataPromise, function(err){
    return (err) ? reject( new Error('El archivo no se pudo copiar') ) : resolve('Archivo copiado')
  })
})

archivoExiste
  .then((result) => leeArchivo(result))
  .then((result) => evitaSobreescritura(result))
  .then((result) => copiaArchivo(result))
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message))

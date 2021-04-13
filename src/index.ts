//import * as express from 'express';
import { createConnection } from "typeorm";
import { dbConfig } from './dbConfig';
var cors = require('cors')

createConnection(dbConfig).catch(error => console.log(error));

const hostname = '127.0.0.1';
const port = 3001;
const bodyParser = require('body-parser');

//const app = express();

var express = require('express');
var app = express();
app.use(express.static(__dirname));

var globalRoute = require('./routes/GlobalRoute');
var securityRoute = require('./routes/SecurityRoute');
var usuarioRoute = require('./routes/UsuarioRoute');
var domiciliarioRoute = require('./routes/DomiciliarioRoute');
var clienteRoute = require('./routes/ClienteRoute');
var servicioClienteRoute = require('./routes/ServicioClienteRoute');
var planesRoute = require('./routes/PlanesRoute');
var categoriasRoute = require('./routes/CategoriasRoute');
var productosRoute = require('./routes/ProductoRoute');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('Bienvenido al backend del APPSISTONIO! <br> Para ver la documetaci&oacute;n del servicio ingrese a este link <a href="https://documenter.getpostman.com/view/3542237/Tz5v1F1k" taget="_blank">https://documenter.getpostman.com/view/3542237/Tz5v1F1k</a>');
});

app.use('/global', globalRoute);
app.use('/security', securityRoute);
app.use('/usuario', usuarioRoute);
app.use('/domiciliario', domiciliarioRoute);
app.use('/cliente', clienteRoute);
app.use('/servicio', servicioClienteRoute);
app.use('/planes', planesRoute);
app.use('/categorias', categoriasRoute);
app.use('/productos', productosRoute);

app.listen(port, () => {
  return console.log(`Servicio listo en el la ruta: http://${hostname}:${port}`);
});

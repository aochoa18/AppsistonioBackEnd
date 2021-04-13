import { TypedJSON } from "typedjson";
import { ProductoBusiness } from "../Business/ProductoBusiness";
import { ProductoRequest } from "../models/ProductoRequest";
import { Response, TypeResponse } from "../models/Response";

const ProductoB = new ProductoBusiness();

exports.CreateProducto = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(ProductoRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var hostname = req.protocol + '://' + req.get('host');
            var newUser = await ProductoB.CreateProducto(usrReq.Producto, usrReq.Imagen, hostname);
            if (newUser != null) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "No se pudo crear la Producto o ya existe una Producto con este nombre";
                response.Type = TypeResponse.Error;
                response.Value = null;
            }
            res.send(response);
        }
        else {
            response.Message = "Peticion incorrecta";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.UpdateProducto = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(ProductoRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var hostname = req.protocol + '://' + req.get('host');
            var newUser = await ProductoB.UpdateProducto(usrReq.Producto, usrReq.Imagen, hostname);
            if (newUser) {
                response.Message = "Producto actualizado exitosamente";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "La Producto no existe";
                response.Type = TypeResponse.Error;
                response.Value = null;
            }
            res.send(response);
        }
        else {
            response.Message = "La solicitud es incorrecta";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.GetProductos = async (req, res) => {
    var response: Response = new Response();
    try {
        var newUser = await ProductoB.GetProductos();
        if (newUser) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(newUser);
        }
        else {
            response.Message = "La Producto no existe";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
        res.send(response);
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.GetProductoById = async (req, res) => {
    var response: Response = new Response();
    try {
        var idProducto = parseInt(req.query.idProducto)
        var newUser = await ProductoB.GetProductoById(idProducto);
        if (newUser) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(newUser);
        }
        else {
            response.Message = "La Producto no existe";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
        res.send(response);
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

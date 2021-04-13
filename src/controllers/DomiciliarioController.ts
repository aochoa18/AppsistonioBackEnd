import { TypedJSON } from "typedjson";
import { DomiciliarioBusiness } from "../Business/DomiciliarioBusiness";
import { DomiciliarioProductosRequest } from "../models/DomiciliarioProductosRequest";
import { DomiciliarioRequest } from "../models/DomiciliarioRequest";
import { Response, TypeResponse } from "../models/Response";


const DomiciliarioB = new DomiciliarioBusiness();

exports.CrearDomiciliario = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(DomiciliarioRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.CreatePerfilDomicilario(usrReq.Domiciliario);
            if (newUser != null) {
                response.Message = "¡Bienvenio a SusEnvíos!";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El correo electrónico ya se encuentra registrado";
                response.Type = TypeResponse.Error;
                response.Value = null;
            }
            res.send(response);
        }
        else {
            response.Message = "No se pudo crear el perfíl de Domiciliario";
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

exports.GetDomiciliario = async (req, res) => {
    var response: Response = new Response();
    try {
        var usrReq = parseInt(req.query.idDomiciliario);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.GetPerfilDomiciliario(usrReq);
            if (newUser) {
                response.Message = "";
                response.Type = TypeResponse.Ok,
                    response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Domiciliario no existe";
                response.Type = TypeResponse.Error,
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

exports.GetAllDomiciliarios = async (req, res) => {
    var response: Response = new Response();
    try {
        var newUser = await DomiciliarioB.GetAllDomiciliarios();
        if (newUser) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(newUser);
        }
        else {
            response.Message = "No hay domiciliarios";
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

exports.UpdateDomiciliario = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(DomiciliarioRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.UpdatePerfilDomiciliario(usrReq.Domiciliario);
            if (newUser) {
                response.Message = "Perfil actualizado exitosamente";
                response.Type = TypeResponse.Ok,
                    response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Domiciliario no existe";
                response.Type = TypeResponse.Error,
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

exports.GetDomiciliarioPos = async (req, res) => {
    var response: Response = new Response();
    try {
        var usrReq = parseInt(req.query.idDomiciliario);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.GetDomiciliarioPos(usrReq);
            if (newUser) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Domiciliario no existe";
                response.Type = TypeResponse.Error,
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

exports.GetServiciosDomiciliario = async (req, res) => {
    var response: Response = new Response();
    try {
        var usrReq = parseInt(req.query.idDomiciliario);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.GetServiciosDomiciliario(usrReq);
            if (newUser) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Domiciliario no existe";
                response.Type = TypeResponse.Error,
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

exports.CreateDomicilarioProducto= async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(DomiciliarioProductosRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.CreateDomicilarioProducto(usrReq.DomiciliarioProductos);
            if (newUser) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "No se pudo crear la relacion. consulte al administrador";
                response.Type = TypeResponse.Error,
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

exports.UpdateDomicilarioProducto= async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(DomiciliarioProductosRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.UpdateDomicilarioProducto(usrReq.DomiciliarioProductos);
            if (newUser) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "No se pudo actualizar la relacion. consulte al administrador";
                response.Type = TypeResponse.Error,
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

exports.GetProductosByIdDomiciliario = async (req, res) => {
    var response: Response = new Response();
    try {
        var usrReq = parseInt(req.query.idDomiciliario);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.GetProductosByIdDomiciliario(usrReq);
            if (newUser) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Domiciliario no existe";
                response.Type = TypeResponse.Error,
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

exports.GetDomiciliariosByProducto = async (req, res) => {
    var response: Response = new Response();
    try {
        var usrReq = parseInt(req.query.idProducto);
        if (usrReq != null) {
            var newUser = await DomiciliarioB.GetDomiciliariosByProducto(usrReq);
            if (newUser) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Domiciliario no existe";
                response.Type = TypeResponse.Error,
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
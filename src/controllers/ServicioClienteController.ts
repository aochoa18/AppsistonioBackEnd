import { TypedJSON } from "typedjson";
import { ServiciosBusiness } from "../Business/ServiciosBusiness";
import { PagoRequest } from "../models/PagoRequest";
import { PlanesClienteRequest } from "../models/PlanesClienteRequest";
import { Response, TypeResponse } from "../models/Response";
import { ServicioRequest } from "../models/ServicioRequest";

const ServiciosB = new ServiciosBusiness();

exports.CrearServicioCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(ServicioRequest);
        var servicio = serializer.parse(req.body);
        if (servicio != null) {
            var newUser = await ServiciosB.CreateServicioCliente(servicio.Servicio);
            if (newUser) {
                response.Message = "";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Cliente no existe";
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
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.UpdateServicioCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(ServicioRequest);
        var servicio = serializer.parse(req.body);
        if (servicio != null) {
            var servicioCliente = await ServiciosB.UpdateServicioCliente(servicio.Servicio);
            if (servicioCliente) {
                response.Message = "";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(servicioCliente);
            }
            else {
                response.Message = "El Servicio no existe";
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
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.GetServicioClienteById = async (req, res) => {
    var response: Response = new Response();
    try {
        var idServicio = parseInt(req.query.idServicio.toString());
        if (idServicio != null) {
            var servicioCliente = await ServiciosB.GetServicioById(idServicio);
            if (servicioCliente) {
                response.Message = "";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(servicioCliente);
            }
            else {
                response.Message = "El Servicio no existe";
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
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.UpdatePagoCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(PagoRequest);
        var pagoReq = serializer.parse(req.body);
        if (pagoReq != null) {
            var servicioCliente = await ServiciosB.UpdatePagoCliente(pagoReq.Pago);
            if (servicioCliente) {
                response.Message = "";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(servicioCliente);
            }
            else {
                response.Message = "El Servicio no existe";
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
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.GetServiciosByIdEstado = async (req, res) => {
    var response: Response = new Response();
    try {
        var idEstado = parseInt(req.query.idEstado.toString());
        if (idEstado != null) {
            var servicioCliente = await ServiciosB.GetServiciosByIdEstado(idEstado);
            if (servicioCliente) {
                response.Message = "";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(servicioCliente);
            }
            else {
                response.Message = "El Servicio no existe";
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
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.CreatePlanCliente = async (req, res) =>{
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(PlanesClienteRequest);
        var servicio = serializer.parse(req.body);
        console.log(servicio);
        if (servicio != null) {
            var newUser = await ServiciosB.CreatePlanCliente(servicio.PlanCliente);
            if (newUser) {
                response.Message = "";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El Cliente no existe";
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
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};
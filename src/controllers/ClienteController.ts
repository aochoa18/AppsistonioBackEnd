import { TypedJSON } from "typedjson";
import { ClienteBusiness } from "../Business/ClienteBussines";
import { ClienteRequest } from "../models/ClienteRequest";
import { DireccionRequest } from "../models/DireccionRequest";
import { GenericRequest } from "../models/GenericRequest";
import { Response, TypeResponse } from "../models/Response";

const ClienteB = new ClienteBusiness();

exports.CrearCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(ClienteRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await ClienteB.CreatePerfilCliente(usrReq.Cliente);
            if (newUser != null) {
                response.Message = "¡Bienvenido a AppSistonio!";
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
            response.Message = "No se pudo crear el perfíl de Cliente";
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

exports.GetCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        //var serializer = new TypedJSON(GenericRequest);
        //var usrReq = serializer.parse(req.body);
        var idCliente = parseInt(req.query.idCliente.toString());
        if (idCliente != null) {
            var newUser = await ClienteB.GetPerfilCliente(idCliente);
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
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.UpdateCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(ClienteRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await ClienteB.UpdatePerfilCliente(usrReq.Cliente);
            if (newUser) {
                response.Message = "Perfil actualizado exitosamente";
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
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
};

exports.GetServiciosCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        // var serializer = new TypedJSON(GenericRequest);
        // var usrReq = serializer.parse(req.body);
        var idCliente = parseInt(req.query.idCliente.toString());
        if (idCliente != null) {
            var newUser = await ClienteB.GetServiciosCliente(idCliente);
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

exports.crearDireccionCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(DireccionRequest);
        var direccion = serializer.parse(req.body);
        if (direccion != null) {
            var newUser = await ClienteB.CreateDireccionCliente(direccion);
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

exports.eliminarDireccionCliente = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(GenericRequest);
        var request = serializer.parse(req.body);
        if (request != null) {
            var newUser = await ClienteB.DelDireccion(request.Id);
            if (newUser) {
                response.Message = "Direccion eliminada correctamente";
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

exports.GetAllClientes = async (req, res) => {
    var clientes = await ClienteB.GetAllClientes();
    var response: Response = new Response();
    response.Message = null;
    response.Type = TypeResponse.Ok;
    response.Value = JSON.stringify(clientes);
    res.send(response);
};


exports.GetActivePlanCliente = async  (req, res) => {
    var idCliente = parseInt(req.query.idCliente.toString());
    var planes = await ClienteB.GetActivePlanCliente(idCliente);
    var response: Response = new Response();
    response.Message = null;
    response.Type = TypeResponse.Ok;
    response.Value = JSON.stringify(planes);
    res.send(response);
};
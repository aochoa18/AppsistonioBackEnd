import { TypedJSON } from "typedjson";
import { UsuarioBusiness } from "../Business/UsuariosBusiness";
import { GenericRequest } from "../models/GenericRequest";
import { Response, TypeResponse } from "../models/Response";
import { UsuarioRequest } from "../models/UsuarioRequest";

const UsuarioB = new UsuarioBusiness();

exports.CrearUsuario = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(UsuarioRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await UsuarioB.CreatePerfilUsuario(usrReq.Usuario);
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
            response.Message = "No se pudo crear el perfíl de usuario";
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

exports.GetUsuario = async (req, res) => {
    var response: Response = new Response();
    try {
        // var serializer = new TypedJSON(GenericRequest);
        var usrReq = parseInt(req.query.idUsuario);
        if (usrReq != null) {
            var newUser = await UsuarioB.GetPerfilUsuario(usrReq);
            if (newUser) {
                response.Message = "";
                response.Type = TypeResponse.Ok,
                    response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El usuario no existe";
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

exports.UpdateUsuario = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(UsuarioRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await UsuarioB.UpdatePerfilUsuario(usrReq.Usuario);
            if (newUser) {
                response.Message = "Perfil actualizado exitosamente";
                response.Type = TypeResponse.Ok,
                    response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El usuario no existe";
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

exports.GetAllUsuarios = async (req, res) => {
    var response: Response = new Response();
    try {
        var newUser = await UsuarioB.GetAllUsuarios();
        if (newUser) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(newUser);
        }
        else {
            response.Message = "El usuario no existe";
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
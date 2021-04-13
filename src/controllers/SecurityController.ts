import { TypedJSON } from "typedjson";
import { SecurityBusiness } from "../Business/SecurityBusiness";
import { GenericRequest } from "../models/GenericRequest";
import { LoginRequest } from "../models/LoginRequest";
import { PushTokenRequest } from "../models/PushTokenRequest";
import { Response, TypeResponse } from "../models/Response";

const SecurityB = new SecurityBusiness();

exports.login = async (req, res) => {
    try {
        var response: Response = new Response();
        var serializer = new TypedJSON(LoginRequest);
        var logReq = serializer.parse(req.body);
        if (logReq != null) {
            var response = await SecurityB.Login(logReq.username.trim(), logReq.password.trim(), logReq.Type);
            res.send(response);
        }
        else {
            response.Message = "Solicitud Incorrecta";
            response.Type = TypeResponse.Error;
            response.Value = null;
            res.send(response);
        }
    }
    catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
}

exports.logout = async (req, res) => {
    try {
        var response: Response = new Response();
        var serializer = new TypedJSON(GenericRequest);
        var logReq = serializer.parse(req.body);
        if (logReq != null) {
            var resp = await SecurityB.Logout(logReq.Id);
            if (resp) {
                response.Message = "Se ha cerrado la session correctamente.";
                response.Type = TypeResponse.Ok;
                response.Value = null;
                res.send(response);
            } else {
                response.Message = "Solicitud Incorrecta";
                response.Type = TypeResponse.Error;
                response.Value = null;
                res.send(response);
            }
        }
        else {
            response.Message = "Solicitud Incorrecta";
            response.Type = TypeResponse.Error;
            response.Value = null;
            res.send(response);
        }
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
}

exports.UpdatePwd = async (req, res) => {
    try {
        var response: Response = new Response();
        var serializer = new TypedJSON(GenericRequest);
        var request = serializer.parse(req.body);
        SecurityB.UpdatePassword(request.Id, request.newPassword, request.TypeUser);
        response.Message = "Se ha realizado el cambio de contraseña correctamente";
        response.Type = TypeResponse.Ok;
        response.Value = null;
        res.send(response);
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
}

exports.RecoverPwd = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(GenericRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var resp = await SecurityB.RecoverPassword(usrReq.email, usrReq.TypeUser);
            if (resp) {
                response.Message = "";
                response.Type = TypeResponse.Ok,
                    response.Value = JSON.stringify(resp);
            } else {
                response.Message = "El usuario no existe";
                response.Type = TypeResponse.Error,
                    response.Value = null;
            }
            res.send(response);
        }
    } catch (error) {
        console.log(error);
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = null;
        res.send(response);
    }
}

exports.UpdatePushToken = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(PushTokenRequest);
        var pushReq = serializer.parse(req.body);
        if (pushReq != null) {
            var pushData = await SecurityB.UpdatePushToken(pushReq);
            if (pushData != null) {
                response.Message = "Token Actualizado";
                response.Type = TypeResponse.Ok;
                response.Value = null
            }
            else {
                response.Message = "No se pudo actualizar el perfil del usuario";
                response.Type = TypeResponse.Error;
                response.Value = null
            }
            res.send(response);
        }
        else {
            response.Message = "No se pudo actualizar el perfíl del usuario";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
    }
    catch (error) {
    }
}
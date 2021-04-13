import { TypedJSON } from "typedjson";
import { ParametersBusiness } from "../Business/ParametersBusiness";
import { UtilBusiness } from "../Business/UtilsBusiness";
import { GenericRequest } from "../models/GenericRequest";
import { OtpRequest } from "../models/OtpRequest";
import { Response, TypeResponse } from "../models/Response";

const ParametersB = new ParametersBusiness();
const UtilsB = new UtilBusiness();


exports.GetParameters = async (req, res) => {
    try {
        var response: Response = new Response();
        var params = await ParametersB.GetParameters();
        if (params != null) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(params);
        }
        else {
            response.Message = "No hay parametros configurados";
            response.Type = TypeResponse.Error;
            response.Value = JSON.stringify(null);
        }
        res.send(response);
    }
    catch (error) {
        console.log(error);
        var response: Response = new Response();
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = JSON.stringify(null);
        res.send(response);
    }
}

exports.RequestOTP = async (req, res) => {
    var response: Response = new Response();
    var serializer = new TypedJSON(OtpRequest)
    var otpReq = serializer.parse(req.body);
    if (otpReq != null) {
        var otpRes = await UtilsB.CreateOTP(otpReq.phoneNumber, otpReq.otp);
        if (otpRes.success) {
            response.Message = "Solicitud Correcta";
            response.Type = TypeResponse.Ok;
            response.Value = null;
        }
        else {
            //response.Message="No fue posible enviar el código de verificación. Por favor valide que el número ingresado sea correcto";
            response.Message = otpRes.message;
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
    }
    else {
        response.Message = "Solicitud Incorrecta";
        response.Type = TypeResponse.Error;
        response.Value = null;
    }
    res.send(response);
}

exports.CambiarEstadoDepartamento= async (req, res) => {
    var response: Response = new Response();
    var idDepto = parseInt(req.query.idDepartamento);
    if (idDepto != null) {
        var otpRes = await ParametersB.CambiarEstadoDepartamento(idDepto);
        if (otpRes) {
            response.Message = "Cambio de estado Correcto";
            response.Type = TypeResponse.Ok;
            response.Value = null;
        }
        else {
            response.Message="Error al cambiar el estado o el idDepartamento ingresado no existe";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
    }
    else {
        response.Message = "Solicitud Incorrecta";
        response.Type = TypeResponse.Error;
        response.Value = null;
    }
    res.send(response);
}

exports.CambiarEstadoMunicipio= async (req, res) => {
    var response: Response = new Response();
    var idDepto = parseInt(req.query.idMunicipio);
    if (idDepto != null) {
        var otpRes = await ParametersB.CambiarEstadoMunicipio(idDepto);
        if (otpRes) {
            response.Message = "Cambio de estado Correcto";
            response.Type = TypeResponse.Ok;
            response.Value = null;
        }
        else {
            response.Message="Error al cambiar el estado o el idMunicipio ingresado no existe";
            response.Type = TypeResponse.Error;
            response.Value = null;
        }
    }
    else {
        response.Message = "Solicitud Incorrecta";
        response.Type = TypeResponse.Error;
        response.Value = null;
    }
    res.send(response);
}

exports.GetDepartamentos = async (req, res) => {
    try {
        var response: Response = new Response();
        var params = await ParametersB.GetDepartamentos();
        if (params != null) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(params);
        }
        else {
            response.Message = "No hay departamentos configurados";
            response.Type = TypeResponse.Error;
            response.Value = JSON.stringify(null);
        }
        res.send(response);
    }
    catch (error) {
        console.log(error);
        var response: Response = new Response();
        response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
        response.Type = TypeResponse.Error;
        response.Value = JSON.stringify(null);
        res.send(response);
    }
}
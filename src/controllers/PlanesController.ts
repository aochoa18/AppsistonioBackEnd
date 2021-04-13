import { TypedJSON } from "typedjson";
import { PlanesBusiness } from "../Business/PlanesBusiness";
import { PlanRequest, PlanConfigRequest } from "../models/PlanesRequest";
import { Response, TypeResponse } from "../models/Response";

const PlanesB = new PlanesBusiness();

exports.GetAllPlanes = async (req, res) => {
    try {
        var response: Response = new Response();
        var params = await PlanesB.GetAllPlanes();
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

exports.GetPlanById = async (req, res) => {
    try {
        var response: Response = new Response();
        var idPlan = parseInt(req.query.idPlan)
        var params = await PlanesB.GetPlanById(idPlan);
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

exports.CreatePlan = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(PlanConfigRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await PlanesB.CreatePlan(usrReq.Plan);
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
}

exports.UpdatePlan = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(PlanConfigRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var newUser = await PlanesB.UpdatePlan(usrReq.Plan);
            if (newUser != null) {
                response.Message = "Plan actualizado correctamente.";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "El plan no existe o ya existen usuarios que tengan este plan.";
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
}
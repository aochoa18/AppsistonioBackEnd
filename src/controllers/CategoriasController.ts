import { TypedJSON } from "typedjson";
import { CategoriasBusiness } from "../Business/CategoriasBusiness";
import { CategoriaRequest } from "../models/CategoriaRequest";
import { Response, TypeResponse } from "../models/Response";
// import { SubCategoriaRequest } from "../models/SubCategoriaRequest";

const CategoriaB = new CategoriasBusiness();
// const SubCategoriaB = new SubCategoriasBusiness();

exports.CreateCategoria = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(CategoriaRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var hostname = req.protocol + '://' + req.get('host');
            var newUser = await CategoriaB.CreateCategoria(usrReq.Categoria, usrReq.Imagen, hostname);
            if (newUser != null) {
                response.Message = null;
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "No se pudo crear la categoria o ya existe una categoria con este nombre";
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

exports.UpdateCategoria = async (req, res) => {
    var response: Response = new Response();
    try {
        var serializer = new TypedJSON(CategoriaRequest);
        var usrReq = serializer.parse(req.body);
        if (usrReq != null) {
            var hostname = req.protocol + '://' + req.get('host');
            var newUser = await CategoriaB.UpdateCategoria(usrReq.Categoria,usrReq.Imagen,hostname);
            if (newUser) {
                response.Message = "Categoria actualizado exitosamente";
                response.Type = TypeResponse.Ok;
                response.Value = JSON.stringify(newUser);
            }
            else {
                response.Message = "La categoria no existe";
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

exports.GetCategorias = async (req, res) => {
    var response: Response = new Response();
    try {
        var newUser = await CategoriaB.GetCategorias();
        if (newUser) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(newUser);
        }
        else {
            response.Message = "La categoria no existe";
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

exports.GetCategoriaById = async (req, res) => {
    var response: Response = new Response();
    try {
        var idCategoria = parseInt(req.query.idCategoria)
        var newUser = await CategoriaB.GetCategoriaById(idCategoria);
        if (newUser) {
            response.Message = "";
            response.Type = TypeResponse.Ok;
            response.Value = JSON.stringify(newUser);
        }
        else {
            response.Message = "La categoria no existe";
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

// exports.CreateSubCategoria = async (req, res) => {
//     var response: Response = new Response();
//     try {
//         var serializer = new TypedJSON(SubCategoriaRequest);
//         var usrReq = serializer.parse(req.body);
//         if (usrReq != null) {
//             var hostname = req.protocol + '://' + req.get('host');
//             var newUser = await SubCategoriaB.CreateSubCategoria(usrReq.SubCategoria, usrReq.Imagen, hostname);
//             if (newUser != null) {
//                 response.Message = null;
//                 response.Type = TypeResponse.Ok;
//                 response.Value = JSON.stringify(newUser);
//             }
//             else {
//                 response.Message = "No se pudo crear la categoria o ya existe una categoria con este nombre";
//                 response.Type = TypeResponse.Error;
//                 response.Value = null;
//             }
//             res.send(response);
//         }
//         else {
//             response.Message = "Peticion incorrecta";
//             response.Type = TypeResponse.Error;
//             response.Value = null;
//         }
//     }
//     catch (error) {
//         console.log(error);
//         response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
//         response.Type = TypeResponse.Error;
//         response.Value = null;
//         res.send(response);
//     }
// };

// exports.UpdateSubCategoria = async (req, res) => {
//     var response: Response = new Response();
//     try {
//         var serializer = new TypedJSON(SubCategoriaRequest);
//         var usrReq = serializer.parse(req.body);
//         if (usrReq != null) {
//             var hostname = req.protocol + '://' + req.get('host');
//             var newUser = await SubCategoriaB.UpdateSubCategoria(usrReq.SubCategoria, usrReq.Imagen, hostname);
//             if (newUser) {
//                 response.Message = "SubCategoria actualizado exitosamente";
//                 response.Type = TypeResponse.Ok;
//                 response.Value = JSON.stringify(newUser);
//             }
//             else {
//                 response.Message = "La categoria no existe";
//                 response.Type = TypeResponse.Error;
//                 response.Value = null;
//             }
//             res.send(response);
//         }
//         else {
//             response.Message = "La solicitud es incorrecta";
//             response.Type = TypeResponse.Error;
//             response.Value = null;
//         }
//     }
//     catch (error) {
//         console.log(error);
//         response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
//         response.Type = TypeResponse.Error;
//         response.Value = null;
//         res.send(response);
//     }
// };

// exports.GetSubCategorias = async (req, res) => {
//     var response: Response = new Response();
//     try {
//         var newUser = await SubCategoriaB.GetSubCategorias();
//         if (newUser) {
//             response.Message = "";
//             response.Type = TypeResponse.Ok;
//             response.Value = JSON.stringify(newUser);
//         }
//         else {
//             response.Message = "La categoria no existe";
//             response.Type = TypeResponse.Error;
//             response.Value = null;
//         }
//         res.send(response);
//     }
//     catch (error) {
//         console.log(error);
//         response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
//         response.Type = TypeResponse.Error;
//         response.Value = null;
//         res.send(response);
//     }
// };

// exports.GetSubCategoriaById = async (req, res) => {
//     var response: Response = new Response();
//     try {
//         var idSubCategoria = parseInt(req.query.idSubCategoria)
//         var newUser = await SubCategoriaB.GetSubCategoriaById(idSubCategoria);
//         if (newUser) {
//             response.Message = "";
//             response.Type = TypeResponse.Ok;
//             response.Value = JSON.stringify(newUser);
//         }
//         else {
//             response.Message = "La categoria no existe";
//             response.Type = TypeResponse.Error;
//             response.Value = null;
//         }
//         res.send(response);
//     }
//     catch (error) {
//         console.log(error);
//         response.Message = "Se presentó una excepcion no controlada, por favor contáctese con el proveedor del servicio";
//         response.Type = TypeResponse.Error;
//         response.Value = null;
//         res.send(response);
//     }
// };
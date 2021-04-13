import { jsonMember, jsonObject } from "typedjson";
import { Categoria } from "../entities/Categoria";
import { Municipio } from "../entities/Municipio";
import { Parametros } from "../entities/Parametros";
import { TiposIdentificacion } from "../entities/TiposIdentificacion";
import { TipoVehiculo } from "../entities/TipoVehiculo";

export class ParametersResponse
{
    Ciudades:Municipio[] | undefined;

    Categorias:Categoria[] | undefined; 

    TiposVehiculo:TipoVehiculo[] | undefined;

    TiposIdentificacion:TiposIdentificacion[] | undefined;

    ParametrosGlobales:Parametros[] | undefined;
}
import { jsonMember, jsonObject } from "typedjson";
import { getManager } from "typeorm";
import { isBoolean } from "util";
import { Municipio } from "../entities/Municipio";

@jsonObject
export class DireccionRequest
{
    @jsonMember
    id: string;
  
    @jsonMember
    direccion: string;
  
    @jsonMember
    estado: string;
  
    @jsonMember
    esDefault: string;
  
    @jsonMember
    complemento: string;
  
    @jsonMember
    idUsuario: string;
  
    @jsonMember
    idCiudad: string;

    get Id():number
    {
       return this.id!=null?parseInt(this.id):0; 
    }

    get IdUsuario():number
    {
       return this.idUsuario!=null?parseInt(this.idUsuario):0; 
    }

    get IdCiudad():number
    {
        return this.idCiudad!=null?parseInt(this.idCiudad):0;

    }

    get EsDefault():boolean
    {
       return this.esDefault!=null? this.esDefault=='True'? true : false : false; 
    }
}
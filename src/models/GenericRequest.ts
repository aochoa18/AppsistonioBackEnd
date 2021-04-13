import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class GenericRequest
{
    @jsonMember
    id:string;

    @jsonMember
    idCiudad:string;

    @jsonMember
    nombre:string;

    @jsonMember
    latitud:string;

    @jsonMember
    longitud:string;

    @jsonMember
    distancia:string;

    @jsonMember
    fechaInicial:string;

    @jsonMember
    fechaFinal:string;

    @jsonMember
    email:string;

    @jsonMember
    typeUser:string;

    @jsonMember
    newPassword:string;

    get Id():number
    {
       return this.id!=null?parseInt(this.id):0; 
    }

    get IdCiudad():number
    {
        return this.idCiudad!=null?parseInt(this.idCiudad):0; 
    }

    get Latitud():number
    {
        return this.latitud!=null? parseFloat(this.latitud.replace(",",".")):0;
    }

    get Longitud():number{
        return this.longitud!=null? parseFloat(this.longitud.replace(",",".")):0;
    }

    get Distancia():number{
        return this.distancia!=null? parseInt(this.distancia):0;
    }

    get FechaInicial():Date{
        return new Date(this.fechaInicial);
    }

    get FechaFinal():Date{
        return new Date(this.fechaFinal);
    }

    get TypeUser():number {
        return this.typeUser!=null?parseInt(this.typeUser):0;
    }
}
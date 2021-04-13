import { parse } from 'querystring';
import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';

@jsonObject
export class LoginRequest
{
    @jsonMember
    username:string;
    
    @jsonMember
    password:string;

    @jsonMember
    type:string;

    get Type():TypeUser
    {
        return parseInt(this.type);
    }
} 

export enum TypeUser
{
    Cliente,
    Domiciliario,
    Administrador,
    Establecimiento
}
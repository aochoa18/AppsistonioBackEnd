import 'reflect-metadata';
import { jsonObject, jsonMember, TypedJSON } from 'typedjson';
import { Usuario } from '../entities/Usuario';

@jsonObject
export class UsuarioRequest {
    @jsonMember
    usuario: string;

    get Usuario(): Usuario {
        try {
            //var serializer = new TypedJSON(Usuario);
            var usr: Usuario = JSON.parse(this.usuario);
            return usr;
        }
        catch (err) {
            return null;
        }
    }
}
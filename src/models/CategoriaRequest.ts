import { jsonMember, jsonObject, TypedJSON } from "typedjson";
import { Categoria } from "../entities/Categoria";
import { ImageRequest } from "./ImageRequest";

@jsonObject
export class CategoriaRequest {
    @jsonMember
    categoria: string;
    @jsonMember
    imagen:string;

    get Categoria(): Categoria {
        try {
            var usr: Categoria = JSON.parse(this.categoria);
            return usr;
        }
        catch (err) {
            return null;
        }
    }

    get Imagen() : ImageRequest {
        try {
            var usr: ImageRequest = JSON.parse(this.imagen);
            return usr;
        }
        catch (err) {
            return null;
        }
    }
}
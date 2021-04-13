import { jsonMember, jsonObject, TypedJSON } from "typedjson";
import { Producto } from "../entities/Producto";
import { ImageRequest } from "./ImageRequest";

@jsonObject
export class ProductoRequest {
    @jsonMember
    producto: string;
    @jsonMember
    imagen: string;

    get Producto(): Producto {
        try {
            var usr: Producto = JSON.parse(this.producto);
            return usr;
        }
        catch (err) {
            return null;
        }
    }
    
    get Imagen(): ImageRequest {
        try {
            var usr: ImageRequest = JSON.parse(this.imagen);
            return usr;
        }
        catch (err) {
            return null;
        }
    }

}
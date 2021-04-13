import { jsonMember, jsonObject } from "typedjson";


@jsonObject
export class ImageRequest {
    @jsonMember
    nombreImagen:string;
    @jsonMember
    base64string:string;
}
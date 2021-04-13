import { jsonMember, jsonObject, TypedJSON } from "typedjson";
import { Cliente } from "../entities/Cliente";

@jsonObject
export class ClienteRequest {
    @jsonMember
    cliente: string;

    get Cliente(): Cliente {
        try {
            //var serializer = new TypedJSON(Cliente);
            //var usr=serializer.parse(this.cliente);
            var usr: Cliente = JSON.parse(this.cliente);
            return usr;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
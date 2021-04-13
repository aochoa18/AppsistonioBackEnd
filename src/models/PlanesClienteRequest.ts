import { jsonMember, jsonObject } from "typedjson";
import { PlanesCliente } from "../entities/PlanesCliente";

@jsonObject
export class PlanesClienteRequest {
    @jsonMember
    planCliente: string;

    get PlanCliente(): PlanesCliente {
        try {
            var usr: PlanesCliente = JSON.parse(this.planCliente);
            return usr;
        }
        catch (err) {
            return null;
        }
    }
}
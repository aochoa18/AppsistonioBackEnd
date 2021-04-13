import 'reflect-metadata';
import { jsonArrayMember, jsonMapMember, jsonMember, jsonObject, JsonObjectMetadata, TypedJSON } from "typedjson";

@jsonObject
export class configuracionPlan {
    @jsonMember
    Id: number;
    @jsonMember
    IdPlan: number;
    @jsonMember
    IdProducto: number;
    @jsonMember
    Cantidad: number;
    @jsonMember
    Accion: string;
}

@jsonObject
export class PlanRequest {
    @jsonMember
    Id: number;
    @jsonMember
    Nombre: string;
    @jsonMember
    Estado: boolean;
    @jsonMember
    Precio: number;
    @jsonArrayMember(configuracionPlan)
    configPlan: configuracionPlan[]
}

@jsonObject
export class PlanConfigRequest {
    @jsonMember
    plan: string;

    get Plan(): PlanRequest {
        var serializer = new TypedJSON(PlanRequest);
        var Plan = serializer.parse(this.plan);
        return Plan;
    }
}
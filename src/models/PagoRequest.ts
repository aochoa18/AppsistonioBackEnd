import { jsonMember, jsonObject, TypedJSON } from "typedjson";
import { MedioPago } from "../entities/MedioPago";

@jsonObject
export class PagoCliente {
    @jsonMember
    id: number;

    @jsonMember
    transactionId: string;

    @jsonMember
    valor: number;

    @jsonMember
    estadoTransaccion: string;

    @jsonMember
    fechaCreacion: Date;

    @jsonMember
    fechaRespuesta: Date;

    @jsonMember
    idPedido: number;

    @jsonMember
    idMedioPago: MedioPago;
}

@jsonObject
export class PagoRequest {
    @jsonMember
    pago: string;

    get Pago(): PagoCliente {
        var serializer = new TypedJSON(PagoCliente);
        var pago = serializer.parse(this.pago);
        return pago;
    }
}
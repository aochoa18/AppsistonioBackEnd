import 'reflect-metadata';
import { jsonArrayMember, jsonMapMember, jsonMember, jsonObject, JsonObjectMetadata, TypedJSON } from "typedjson";

@jsonObject
export class ProductoServicio {
    @jsonMember
    IdProducto: number;
    @jsonMember
    IdPlan: number;
    @jsonMember
    Cantidad: number;
    @jsonMember
    Precio: number;
}

@jsonObject
export class ServicioCliente {
    @jsonMember
    Id: number;
    @jsonMember
    IdCliente: number;
    @jsonMember
    Direccion: string;
    @jsonMember
    Complemento: string;
    @jsonMember
    Lat: number;
    @jsonMember
    Lon: number;
    @jsonMember
    IdMunicipio: number;
    @jsonMember
    Observaciones: string;
    @jsonMember
    MedioPago: string;
    @jsonMember
    EstadoServicio: string;
    @jsonArrayMember(ProductoServicio)
    Productos: ProductoServicio[];
    @jsonMember
    PrecioTotal: number;
    @jsonMember
    IdDomiciliario: number;
    @jsonMember
    fechaEntrega: string;

    get FechaEntrega(): Date {
        if (this.fechaEntrega == null || this.fechaEntrega == "" || typeof this.fechaEntrega == 'undefined')
            return null
        else
            return new Date(this.fechaEntrega);
    }
}

@jsonObject
export class ServicioRequest {
    @jsonMember
    servicio: string;

    get Servicio(): ServicioCliente {
        var serializer = new TypedJSON(ServicioCliente);
        var Servicio = serializer.parse(this.servicio);
        return Servicio;
    }
}


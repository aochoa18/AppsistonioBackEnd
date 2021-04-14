import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { Cliente } from '../entities/Cliente';
import { Domiciliario } from '../entities/Domiciliario';
import { EstadoServicio } from '../entities/EstadoServicio';
import { MedioPago } from '../entities/MedioPago';
import { Municipio } from '../entities/Municipio';
import { Pago } from '../entities/Pago';
import { PlanesCliente } from '../entities/PlanesCliente';
import { Producto } from '../entities/Producto';
import { ProductosServicio } from '../entities/ProductosServicio';
import { Servicio } from '../entities/Servicio';
import { PagoCliente } from '../models/PagoRequest';
import { ServicioCliente } from '../models/ServicioRequest';
import { EmailBusiness } from './EmailBusiness';

export class ServiciosBusiness {
    async CreateServicioCliente(servicio: ServicioCliente): Promise<Servicio> {
        var newServicio: Servicio = new Servicio();
        newServicio.idCliente = await getManager().getRepository(Cliente).findOne({ where: { id: servicio.IdCliente } });
        var ciudad = await getManager().getRepository(Municipio).findOne(
            {
                where: { id: servicio.IdMunicipio },
                relations: ["idDepto", "idDepto.idPais"]
            });
        newServicio.direccion = servicio.Direccion + " " + servicio.Complemento;
        newServicio.idMunicipio = ciudad;
        newServicio.idEstadoServicio = await getManager().getRepository(EstadoServicio).findOne({ where: { nombre: servicio.EstadoServicio } });
        newServicio.geolat = servicio.Lat;
        newServicio.observaciones = servicio.Observaciones;
        newServicio.geolon = servicio.Lon;
        newServicio.fechaRegistro = new Date();
        newServicio = await getManager().getRepository(Servicio).save(newServicio);
        for (var i = 0; i < servicio.Productos.length; i++) {
            var producto = servicio.Productos[i];
            var productoServicio: ProductosServicio = new ProductosServicio();
            productoServicio.idPedido = newServicio;
            productoServicio.cantidad = producto.Cantidad;
            productoServicio.idProducto = await getManager().getRepository(Producto).findOne({ where: { id: producto.IdProducto } });
            productoServicio.idPlan = producto.IdPlan;
            productoServicio.precio = producto.Precio;
            productoServicio.fechaRegistro = new Date();
            await getManager().getRepository(ProductosServicio).save(productoServicio);
        }

        if (servicio.MedioPago != null) {
            try {
                var medioPago = await getManager().getRepository(MedioPago).findOne({ nombre: servicio.MedioPago });
                var estado: string = servicio.MedioPago == "Efectivo" ? "APPROVED" : "PENDING";
                var pago: Pago = new Pago();
                pago.idMedioPago = medioPago;
                pago.idPedido = newServicio;
                pago.estadoTransaccion = estado;
                pago.valor = servicio.PrecioTotal;
                //pago.transactionId=newServicio.id.toString();
                await getManager().getRepository(Pago).save(pago);
            }
            catch (error) {
                console.log(error);
            }
        }


        return getManager().getRepository(Servicio).findOne({ where: { id: newServicio.id }, relations: ["productosServicios", "productosServicios.idProducto", "pagos", "pagos.idMedioPago"] });
    }

    async UpdateServicioCliente(updServicio: ServicioCliente): Promise<boolean> {
        var actServicio = await getManager().getRepository(Servicio).findOne({ where: { id: updServicio.Id } });
        if (actServicio != null) {
            actServicio.idDomiciliario = await getManager().getRepository(Domiciliario).findOne({ where: { id: updServicio.IdDomiciliario } });
            var newEstadoServicio = await getManager().getRepository(EstadoServicio).findOne({ where: { nombre: updServicio.EstadoServicio } });;
            actServicio.idEstadoServicio = newEstadoServicio;
            actServicio.fechaEntrega = updServicio.FechaEntrega ?? actServicio.fechaEntrega;
            actServicio.fechaEjecucion = updServicio.FechaEjecucion ?? actServicio.fechaEjecucion;
            actServicio.fechaFinalizacion = updServicio.FechaFinalizacion ?? actServicio.fechaFinalizacion;
            getManager().getRepository(Servicio).save(actServicio);
            var emailBussines: EmailBusiness = new EmailBusiness();
            var serc = await getManager().getRepository(Servicio).findOne({
                where: { id: updServicio.Id }, relations: ['idCliente']
            });
            if (newEstadoServicio != null) {
                if (newEstadoServicio.nombre == "En Proceso") {
                    emailBussines.SendMailAsigando(serc.idCliente.nombre, serc.idCliente.correo, updServicio.fechaEntrega);
                }
                if (newEstadoServicio.nombre == "Terminado") {
                    emailBussines.SendMailTerminado(serc.idCliente.nombre, serc.idCliente.correo);
                }
            }
            return true;
        } else {
            return false;
        }
    }

    GetAllServicios(): Promise<Servicio[]> {
        var data = getManager().getRepository(Servicio).find({
            where: { estado: 1 },
            relations: ["idCliente", "idDomiciliario", "idEstadoServicio", "productosServicios", "productosServicios.idProducto"]
        });
        return data;
    }

    GetServicioById(Id: number): Promise<Servicio> {
        var data = getManager().getRepository(Servicio).findOne({
            where: { id: Id },
            relations: ["idCliente", "idDomiciliario", "idEstadoServicio", "productosServicios", "productosServicios.idProducto"]
        });
        return data;
    }

    async GetServiciosByIdEstado(idEstado: number): Promise<Servicio[]> {
        var estadoServicio = await getManager().getRepository(EstadoServicio).findOne({ where: { id: idEstado } });
        var data = await getManager().getRepository(Servicio).find({
            where: { idEstadoServicio: estadoServicio },
            relations: ["idCliente", "idDomiciliario", "idEstadoServicio", "productosServicios", "productosServicios.idProducto"]
        });
        return data;
    }

    async UpdatePagoCliente(pago: PagoCliente): Promise<Pago> {
        var curPago: Pago = await getManager().getRepository(Pago).findOne({ where: { id: pago.id } });
        curPago.estadoTransaccion = pago.estadoTransaccion;
        curPago.fechaCreacion = pago.fechaCreacion;
        curPago.fechaRespuesta = pago.fechaRespuesta;
        var medioPago: MedioPago = await getManager().getRepository(MedioPago).findOne({ where: { id: pago.idMedioPago.id } });

        curPago.idMedioPago = medioPago;
        var servicio = await getManager().getRepository(Servicio).findOne({ where: { id: pago.idPedido } });

        var nombreEstado = (pago.estadoTransaccion == "APPROVED") ? "Solicitado" : "Pago Rechazado";
        var estado: EstadoServicio = await getManager().getRepository(EstadoServicio).findOne({ where: { nombre: nombreEstado } });
        servicio.idEstadoServicio = estado;
        servicio = await getManager().getRepository(Servicio).save(servicio);

        curPago.idPedido = servicio;
        curPago.transactionId = pago.transactionId;
        curPago.valor = pago.valor;
        curPago = await getManager().getRepository(Pago).save(curPago);

        if (pago.estadoTransaccion == 'APPROVED') {
            var srcCliente = await getManager().getRepository(Servicio).findOne({
                where: { id: pago.idPedido },
                relations: ["idCliente", "productosServicio", "productosServicio.idProducto"]
            });
            var emailBussines: EmailBusiness = new EmailBusiness();
            emailBussines.SendMailNewServicio(srcCliente.idCliente.nombre, srcCliente.idCliente.correo, srcCliente.productosServicios[0].idProducto.nombre);
        } else if (pago.estadoTransaccion == 'REJECTED') {
            var srcCliente = await getManager().getRepository(Servicio).findOne({ where: { id: pago.idPedido }, relations: ["idCliente"] });
            var emailBussines: EmailBusiness = new EmailBusiness();
            emailBussines.SendMailPagRechazado(srcCliente.idCliente.nombre, srcCliente.idCliente.correo);
        }
        return getManager().getRepository(Pago).findOne({ where: { id: curPago.id }, relations: ["idMedioPago"] });
    }

    async CreatePlanCliente(planCliente: PlanesCliente) {
        var data = await getManager().getRepository(PlanesCliente).save(planCliente);
        return await getManager().getRepository(PlanesCliente).findOne({
            where: { id: data.id },
            relations: ["idPlan", "idCliente"]
        });
    }
}
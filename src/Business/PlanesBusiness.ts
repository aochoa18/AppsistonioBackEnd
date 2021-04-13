import { getManager } from "typeorm";
import { ConfiguracionPlanes } from "../entities/ConfiguracionPlanes";
import { Planes } from "../entities/Planes";
import { PlanesCliente } from "../entities/PlanesCliente";
import { Producto } from "../entities/Producto";
import { configuracionPlan, PlanRequest } from "../models/PlanesRequest";

export class PlanesBusiness {
    GetAllPlanes(): Promise<Planes[]> {
        var data = getManager().getRepository(Planes).find({
            where: { estado: 1 },
            relations: ["configuracionPlanes","configuracionPlanes.idProducto"]
        });
        return data;
    }

    GetPlanById(Id: number): Promise<Planes> {
        var data = getManager().getRepository(Planes).findOne({
            where: { id: Id },
            relations: ["configuracionPlanes","configuracionPlanes.idProducto"]
        });
        return data;
    }

    async CreatePlan(plan: PlanRequest) {
        var newPlan = new Planes();
        newPlan.estado = plan.Estado;
        newPlan.fechaRegistro = new Date();
        newPlan.nombre = plan.Nombre;
        newPlan.precio = plan.Precio;
        newPlan = await getManager().getRepository(Planes).save(newPlan);
        for (var i = 0; i < plan.configPlan.length; i++) {
            var element = plan.configPlan[i];
            var config = new ConfiguracionPlanes();
            config.idPlan = newPlan;
            config.cantidad = element.Cantidad;
            config.fechaRegistro = new Date();
            config.idProducto = await getManager().getRepository(Producto).findOne({ where: { id: element.IdProducto } });
            config = await getManager().getRepository(ConfiguracionPlanes).save(config);
        };
        return getManager().getRepository(Planes).findOne({ where: { id: newPlan.id }, relations: ["configuracionPlanes"] });
    };

    async UpdatePlan(plan: PlanRequest) {
        var newPlan = await getManager().getRepository(Planes).findOne({ where: { id: plan.Id } });
        
        if (newPlan==null){
            return null;
        }
        var usuarioPlan = await getManager().getRepository(PlanesCliente).find({ where: { idPlan: plan.Id } });
        if (usuarioPlan.length > 0){
            return null;
        }
        newPlan.estado = plan.Estado;
        newPlan.fechaRegistro = new Date();
        newPlan.nombre = plan.Nombre;
        newPlan.precio = plan.Precio;
        newPlan = await getManager().getRepository(Planes).save(newPlan);
        for (var i = 0; i < plan.configPlan.length; i++) {
            var element = plan.configPlan[i];
            if (element.Accion == "Create") {
                var config = new ConfiguracionPlanes();
                config.idPlan = newPlan;
                config.cantidad = element.Cantidad;
                config.fechaRegistro = new Date();
                config.idProducto = await getManager().getRepository(Producto).findOne({ where: { id: element.IdProducto } });
                config = await getManager().getRepository(ConfiguracionPlanes).save(config);
            } else if (element.Accion == "Update") {
                var config = await getManager().getRepository(ConfiguracionPlanes).findOne({ where: { id: element.Id } });
                config.idPlan = newPlan;
                config.cantidad = element.Cantidad;
                config.fechaRegistro = new Date();
                config.idProducto = await getManager().getRepository(Producto).findOne({ where: { id: element.IdProducto } });
                config = await getManager().getRepository(ConfiguracionPlanes).save(config);
            } else if (element.Accion == "Delete"){
                getManager().getRepository(ConfiguracionPlanes).delete({ id: element.Id });
            }
        };
        return getManager().getRepository(Planes).findOne({ where: { id: newPlan.id }, relations: ["configuracionPlanes"] });
    };

}
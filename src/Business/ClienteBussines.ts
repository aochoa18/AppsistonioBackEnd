import { getManager, UpdateResult, DeleteResult, Raw } from 'typeorm';
import { Cliente } from '../entities/Cliente';
import { DireccionRequest } from '../models/DireccionRequest';
import { DireccionCliente } from '../entities/DireccionCliente';
import { Municipio } from '../entities/Municipio';
import { Servicio } from '../entities/Servicio';
import { PlanesCliente } from '../entities/PlanesCliente';

export class ClienteBusiness {
    async CreatePerfilCliente(newUser: Cliente): Promise<Cliente> {
        var exist = await getManager().getRepository(Cliente).findOne({ where: { correo: newUser.correo } });
        if (exist != null)
            return null;
        //var ciudad= await getManager().getRepository(Ciudad).findOne({ where : { id : newUser.idCiudad2.id }, relations:["idEstado2","idEstado2.idPais2"] });
        var data = getManager().getRepository(Cliente).save(newUser);
        return data;
    }

    GetPerfilCliente(Id: number): Promise<Cliente> {
        var data = getManager().getRepository(Cliente).findOne({
            where: { id: Id },
            relations: ["direccionClientes", "direccionClientes.idCiudad"]
        });
        return data;
    }

    async UpdatePerfilCliente(perfil: Cliente): Promise<boolean> {
        var updateProfile = await getManager().getRepository(Cliente).findOne({ where: { id: perfil.id } });
        if (updateProfile != null) {
            updateProfile.contrasena = perfil.contrasena == null ? updateProfile.contrasena : perfil.contrasena;
            updateProfile.documento = perfil.documento;
            updateProfile.direccion = perfil.direccion;
            updateProfile.correo = perfil.correo;
            updateProfile.estado = perfil.estado;
            updateProfile.id = perfil.id;
            updateProfile.nombre = perfil.nombre;
            updateProfile.telefono = perfil.telefono;
            getManager().getRepository(Cliente).save(updateProfile);
            return true;
        }
        else {
            return false;
        }
    }

    async GetServiciosCliente(Id: number) {
        var data = getManager().getRepository(Servicio).find({
            where: { idCliente: Id },
            relations: ["idDomiciliario", "idDomiciliario.idTipoVehiculo", "idDomiciliario.idMarca", "idEstadoServicio", "productosServicios", "productosServicios.idProducto"],
            order: { fechaEntrega: 'DESC' }
        });
        return data;
    }

    async GetActivePlanCliente(IdCliente: number) {
        var data = getManager().getRepository(PlanesCliente).find({
            where: {
                idCliente: IdCliente,
                desde: Raw(alias => `cast(${alias} as date) <= cast(getdate() as date)`),
                hasta: Raw(alias => `cast(${alias} as date) >= cast(getdate() as date)`)
            },
            relations: ["idCliente", "idPlan", "idPlan.configuracionPlanes", "idPlan.configuracionPlanes.idProducto"]
        });
        return data;
    }

    async CreateDireccionCliente(direccion: DireccionRequest): Promise<DireccionCliente> {
        var newDir: DireccionCliente = new DireccionCliente();
        newDir.direccion = direccion.direccion;
        newDir.complemento = direccion.complemento;
        newDir.esDefault = direccion.EsDefault;
        newDir.idUsuario = await getManager().getRepository(Cliente).findOne({ where: { id: direccion.IdUsuario } });
        newDir.idCiudad = await getManager().getRepository(Municipio).findOne({ where: { id: direccion.idCiudad } });

        var data = getManager().getRepository(DireccionCliente).save(newDir);
        return data;
    }

    async DelDireccion(idDireccion: number) {
        try {
            getManager().getRepository(DireccionCliente).delete({ id: idDireccion });
            return true;
        } catch {
            return false;
        }
    }

    GetAllClientes() {
        try {
            var clientes = getManager().getRepository(Cliente).find({});
            return clientes;
        } catch {
            return null;
        }
    }
}
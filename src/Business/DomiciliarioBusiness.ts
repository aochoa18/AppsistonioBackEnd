import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { Domiciliario } from '../entities/Domiciliario';
import { DomiciliarioPos } from '../entities/DomiciliarioPos';
import { DomiciliarioProductos } from '../entities/DomiciliarioProductos';
import { Producto } from '../entities/Producto';
import { Servicio } from '../entities/Servicio';

export class DomiciliarioBusiness {
    async CreatePerfilDomicilario(newUser: Domiciliario): Promise<Domiciliario> {
        var exist = await getManager().getRepository(Domiciliario).findOne({ where: { userLogin: newUser.userLogin } });
        if (exist != null)
            return null;
        //var ciudad= await getManager().getRepository(Ciudad).findOne({ where : { id : newUser.idCiudad2.id }, relations:["idEstado2","idEstado2.idPais2"] });
        newUser.idUsuarioRegistro = 1;
        var data = getManager().getRepository(Domiciliario).save(newUser);
        return data;
    }

    GetPerfilDomiciliario(Id: number): Promise<Domiciliario> {
        var data = getManager().getRepository(Domiciliario).findOne({
            where: { id: Id },
            relations: [
                "idMarca",
                "idTipoVehiculo"
            ]
        });
        return data;
    }

    GetAllDomiciliarios(): Promise<Domiciliario[]> {
        var data = getManager().getRepository(Domiciliario).find({
            where: { estado: true },
            relations: [
                "idMarca",
                "idTipoVehiculo",
                "idMunicipio"
            ]
        });
        return data;
    }

    async UpdatePerfilDomiciliario(perfil: Domiciliario): Promise<boolean> {
        var updateProfile = await getManager().getRepository(Domiciliario).findOne({ where: { id: perfil.id } });
        if (updateProfile != null) {
            updateProfile.passwordLogin = perfil.passwordLogin == null ? updateProfile.passwordLogin : perfil.passwordLogin;
            updateProfile.correo = perfil.correo;
            updateProfile.direccion = perfil.direccion;
            updateProfile.idMunicipio = perfil.idMunicipio == null ? updateProfile.idMunicipio : perfil.idMunicipio;
            updateProfile.idMarca = perfil.idMarca == null ? updateProfile.idMarca : perfil.idMarca;
            updateProfile.idTipoVehiculo = perfil.idTipoVehiculo == null ? updateProfile.idTipoVehiculo : perfil.idTipoVehiculo;
            updateProfile.estado = perfil.estado;
            updateProfile.id = perfil.id;
            updateProfile.nombre = perfil.nombre;
            updateProfile.telefono = perfil.telefono;
            updateProfile.celular = perfil.celular;
            updateProfile.modelo = perfil.modelo;
            updateProfile.placa = perfil.placa;
            updateProfile.idUsuarioRegistro = 1;
            getManager().getRepository(Domiciliario).save(updateProfile);
            return true;
        }
        else {
            return false;
        }
    }

    async GetServiciosDomiciliario(IdUsuario: number) {
        var data = getManager().getRepository(Servicio).find({ where: { idDomiciliario: IdUsuario }, relations: ["idDomiciliario", "idDomiciliario.idTipoVehiculo", "idDomiciliario.idMarca", "idEstablecimiento", "idEstadoPedido", "productosPedidos", "productosPedidos.idProducto"], order: { fechaEntrega: 'DESC' } });
        return data;
    }

    async GetDomiciliarioPos(idDomiciliario: number): Promise<DomiciliarioPos> {
        var pos = await getManager().getRepository(DomiciliarioPos).findOne({ where: { idUsuario: idDomiciliario } });
        return pos;
    }

    async CreateDomicilarioProducto(newUser: DomiciliarioProductos): Promise<DomiciliarioProductos> {
        var exist = await getManager().getRepository(DomiciliarioProductos).findOne({ where: { idDomiciliario: newUser.idDomiciliario.id, idProducto: newUser.idProducto.id } });
        if (exist != null)
            return null;
        //var ciudad= await getManager().getRepository(Ciudad).findOne({ where : { id : newUser.idCiudad2.id }, relations:["idEstado2","idEstado2.idPais2"] });
        var data = getManager().getRepository(DomiciliarioProductos).save(newUser);
        return data;
    }

    async UpdateDomicilarioProducto(newUser: DomiciliarioProductos): Promise<Boolean> {
        var actDomProd = await getManager().getRepository(DomiciliarioProductos).findOne({ where: { id: newUser.id } });
        if (actDomProd != null) {
            actDomProd.estado = newUser.estado;
            actDomProd.fechaRegistro = newUser.fechaRegistro;
            actDomProd.idDomiciliario = await getManager().getRepository(Domiciliario).findOne({ where: { id: newUser.idDomiciliario.id } })
            actDomProd.idProducto = await getManager().getRepository(Producto).findOne({ where: { id: newUser.idProducto.id } })
            var data = getManager().getRepository(DomiciliarioProductos).save(newUser);
            return true;
        } else {
            return false;
        }
    }

    async GetProductosByIdDomiciliario(idDomiciliario: number): Promise<DomiciliarioProductos[]> {
        var pos = await getManager().getRepository(DomiciliarioProductos).find({
            where: { idDomiciliario: idDomiciliario },
            relations: ["idProducto", "idDomiciliario"]
        });
        return pos;
    }

    async GetDomiciliariosByProducto(idProducto:number):Promise<DomiciliarioProductos[]> {
        console.log(idProducto);
        var pos = await getManager().getRepository(DomiciliarioProductos).find({
            where: { idProducto: idProducto },
            relations: ["idDomiciliario"]
        });
        return pos;
    }
}
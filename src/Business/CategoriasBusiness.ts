import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { Categoria } from '../entities/Categoria';
import { Producto } from '../entities/Producto';
import { ImageRequest } from '../models/ImageRequest';

const fs = require("fs");
var path = require('path');

export class CategoriasBusiness {
    async CreateCategoria(newCategoria: Categoria, imagen: ImageRequest, hostname: string): Promise<Categoria> {
        var exist = await getManager().getRepository(Categoria).findOne({ where: { nombre: newCategoria.nombre } });
        if (exist != null)
            return null;
        var base64Data = imagen.base64string;
        var nomFinal = imagen.nombreImagen;
        var ruta = path.dirname(require.main.filename || process.mainModule.filename) + `${path.sep}Archivos${path.sep}ImagenesCategorias${path.sep}`;
        if (!fs.existsSync(ruta)) {
            fs.mkdirSync(ruta);
        }
        fs.writeFile(ruta + nomFinal, base64Data, 'base64', function (err) {
            if (err)
                console.log(err);
        });
        newCategoria.imagen = hostname + "/Archivos/ImagenesCategorias/" + nomFinal;
        //var ciudad= await getManager().getRepository(Ciudad).findOne({ where : { id : newUser.idCiudad2.id }, relations:["idEstado2","idEstado2.idPais2"] });
        var data = getManager().getRepository(Categoria).save(newCategoria);
        return data;
    }

    async UpdateCategoria(updCategoria: Categoria, imagen: ImageRequest, hostname: string): Promise<boolean> {
        var actCategoria = await getManager().getRepository(Categoria).findOne({ where: { id: updCategoria.id } });
        if (actCategoria != null) {
            actCategoria.descripcion = updCategoria.descripcion;
            actCategoria.estado = updCategoria.estado;
            actCategoria.fechaRegistro = updCategoria.fechaRegistro;
            actCategoria.idUsuarioRegistro = updCategoria.idUsuarioRegistro;
            //actCategoria.imagen = updCategoria.imagen;
            actCategoria.nombre = updCategoria.nombre;
            if (imagen != null) {
                var base64Data = imagen.base64string;
                var nomFinal = imagen.nombreImagen;
                var ruta = path.dirname(require.main.filename || process.mainModule.filename) + `${path.sep}Archivos${path.sep}ImagenesCategorias${path.sep}`;
                if (!fs.existsSync(ruta)) {
                    fs.mkdirSync(ruta);
                }
                fs.writeFile(ruta + nomFinal, base64Data, 'base64', function (err) {
                    if (err)
                        console.log(err);
                });
                actCategoria.imagen = hostname + "/Archivos/ImagenesCategorias/" + nomFinal;
            }
            getManager().getRepository(Categoria).save(actCategoria);
            return true;
        } else {
            return false;
        }
    }

    GetCategorias(): Promise<Categoria[]> {
        var data = getManager().getRepository(Categoria).find({
            where: { },
            relations: ["productos"]
        });
        return data;
    }

    GetCategoriaById(Id: number): Promise<Categoria> {
        var data = getManager().getRepository(Categoria).findOne({
            where: { id: Id },
            relations: ["productos"]
        });
        return data;
    }
}
import { getManager } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { Producto } from "../entities/Producto";
import { ImageRequest } from "../models/ImageRequest";

const fs = require("fs");
var path = require('path');

export class ProductoBusiness {
    async CreateProducto(newProducto: Producto, imagen: ImageRequest, hostname: string): Promise<Producto> {
        var exist = await getManager().getRepository(Producto).findOne({ where: { nombre: newProducto.nombre } });
        if (exist != null)
            return null;
        var base64Data = imagen.base64string;
        var nomFinal = imagen.nombreImagen;
        var ruta = path.dirname(require.main.filename || process.mainModule.filename) + `${path.sep}Archivos${path.sep}ImagenesProductos${path.sep}`;
        if (!fs.existsSync(ruta)) {
            fs.mkdirSync(ruta);
        }
        fs.writeFile(ruta + nomFinal, base64Data, 'base64', function (err) {
            if (err)
                console.log(err);
        });
        newProducto.imagen = hostname + "/Archivos/ImagenesProductos/" + nomFinal;
        var data = getManager().getRepository(Producto).save(newProducto);
        return data;
    }

    async UpdateProducto(updProducto: Producto, imagen: ImageRequest, hostname: string): Promise<boolean> {
        var actProducto = await getManager().getRepository(Producto).findOne({ where: { id: updProducto.id } });
        if (actProducto != null) {
            actProducto.descripcion = updProducto.descripcion;
            actProducto.estado = updProducto.estado;
            actProducto.idUsuarioRegistro = updProducto.idUsuarioRegistro;
            actProducto.imagen = updProducto.imagen;
            actProducto.nombre = updProducto.nombre;
            actProducto.precio = updProducto.precio;
            actProducto.precioPromocion = updProducto.precioPromocion;
            actProducto.porcentajePromocion = updProducto.porcentajePromocion;
            actProducto.presentacion = updProducto.presentacion;
            actProducto.idCategoria = await getManager().getRepository(Categoria).findOne({ where: { id: updProducto.idCategoria.id } });
            actProducto.codigo = updProducto.codigo;
            actProducto.codigoSku = updProducto.codigoSku;
            if (imagen != null) {
                var base64Data = imagen.base64string;
                var nomFinal = imagen.nombreImagen;
                var ruta = path.dirname(require.main.filename || process.mainModule.filename) + `${path.sep}Archivos${path.sep}ImagenesProductos${path.sep}`;
                if (!fs.existsSync(ruta)) {
                    fs.mkdirSync(ruta);
                }
                fs.writeFile(ruta + nomFinal, base64Data, 'base64', function (err) {
                    if (err)
                        console.log(err);
                });
                actProducto.imagen = hostname + "/Archivos/ImagenesProductos/" + nomFinal;
            }
            getManager().getRepository(Producto).save(actProducto);
            return true;
        } else {
            return false;
        }
    }

    GetProductos(): Promise<Producto[]> {
        var data = getManager().getRepository(Producto).find({
            where: {  },
            relations: ["idCategoria"]
        });
        return data;
    }

    GetProductoById(Id: number): Promise<Producto> {
        var data = getManager().getRepository(Producto).findOne({
            where: { id: Id },
            relations: ["idCategoria"]
        });
        return data;
    }
}
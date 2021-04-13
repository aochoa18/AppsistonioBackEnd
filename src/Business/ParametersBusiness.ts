import { ParametersResponse } from "../models/ParametersResponse";
import { getManager } from "typeorm";
import { Categoria } from "../entities/Categoria";
import { TipoVehiculo } from "../entities/TipoVehiculo";
import { Parametros } from "../entities/Parametros";
import { Municipio } from "../entities/Municipio";
import { TiposIdentificacion } from "../entities/TiposIdentificacion";
import { Departamento } from "../entities/Departamento";

export class ParametersBusiness {
    async GetParameters(): Promise<ParametersResponse> {
        var toReturn: ParametersResponse = new ParametersResponse();
        //var categorias = await getManager().getRepository(Categoria).find({where:{ estado : 1 }, relations:["subCategorias", "subCategorias.productos"]});
        var categorias = await getManager().getRepository(Categoria).createQueryBuilder("Categoria").leftJoinAndSelect("Categoria.productos", "Producto").where("Categoria.estado = :estado", { estado: true }).andWhere("Producto.estado = :estado", { estado: true }).getMany();
        var tiposVehiculo = await getManager().getRepository(TipoVehiculo).find({ where: { estado: 1 } });
        var parametros = await getManager().getRepository(Parametros).find({ where: { esMovil: true } });
        //var ciudades = await getManager().getRepository(Municipio).find({relations:["idDepto"], where:{ estado : true }, order:{nombre:'ASC'}}).andWhere( 'idDepto.estado = :estado' ,  {  estado : true  });
        var ciudades = await getManager().getRepository(Municipio).createQueryBuilder("Municipio").leftJoinAndSelect("Municipio.idDepto", "Departamento").where("municipio.estado = :estado", { estado: true }).andWhere("Departamento.estado = :estado", { estado: true }).getMany();
        var tiposIdentificacion = await getManager().getRepository(TiposIdentificacion).find({ where: { estado: 1 } });
        toReturn.Categorias = categorias
        toReturn.TiposVehiculo = tiposVehiculo;
        toReturn.ParametrosGlobales = parametros;
        toReturn.Ciudades = ciudades;
        toReturn.TiposIdentificacion = tiposIdentificacion;
        return toReturn;
    }

    async CambiarEstadoDepartamento(idDepartamento: number) {
        var depto = await getManager().getRepository(Departamento).findOne({ where: { id: idDepartamento } });
        if (depto != null) {
            depto.estado = !depto.estado;
            var data = getManager().getRepository(Departamento).save(depto);
            return true;
        } else {
            return false;
        }
    }

    async CambiarEstadoMunicipio(idMunicipio: number) {
        var depto = await getManager().getRepository(Municipio).findOne({ where: { id: idMunicipio } });
        console.log(depto);
        if (depto != null) {
            depto.estado = !depto.estado;
            var data = getManager().getRepository(Municipio).save(depto);
            return true;
        } else {
            return false;
        }
    }

    async GetDepartamentos(){
        var ciudades = await getManager().getRepository(Departamento).find({relations:["municipios"], where:{ }, order:{nombre:'ASC'}})
        return ciudades;
    }
}
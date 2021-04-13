import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { Usuario } from '../entities/Usuario';

export class UsuarioBusiness {
    /**/
    async CreatePerfilUsuario(newUser: Usuario): Promise<Usuario> {
        var exist = await getManager().getRepository(Usuario).findOne({ where: { correo: newUser.correo } });
        if (exist != null)
            return null;
        //var ciudad= await getManager().getRepository(Ciudad).findOne({ where : { id : newUser.idCiudad2.id }, relations:["idEstado2","idEstado2.idPais2"] });
        var data = getManager().getRepository(Usuario).save(newUser);
        return data;
    }

    GetPerfilUsuario(Id: number): Promise<Usuario> {
        var data = getManager().getRepository(Usuario).findOne({
            where: { id: Id },
            relations: ["idTipoUsuario"]
        });
        return data;
    }

    GetAllUsuarios(): Promise<Usuario[]> {
        var data = getManager().getRepository(Usuario).find({
            where: { estado: true },
            relations: ["idTipoUsuario"]
        });
        return data;
    }

    async UpdatePerfilUsuario(perfil: Usuario): Promise<boolean> {
        var updateProfile = await getManager().getRepository(Usuario).findOne({ where: { id: perfil.id } });
        if (updateProfile != null) {
            updateProfile.passwordLogin = perfil.passwordLogin == null ? updateProfile.passwordLogin : perfil.passwordLogin;
            updateProfile.correo = perfil.correo;
            updateProfile.estado = perfil.estado;
            updateProfile.id = perfil.id;
            updateProfile.nombres = perfil.nombres;
            updateProfile.telefono = perfil.telefono;
            getManager().getRepository(Usuario).save(updateProfile);
            return true;
        }
        else {
            return false;
        }
    }
}
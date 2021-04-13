import { getManager, UpdateResult, DeleteResult, Column } from 'typeorm';
import { createHash } from "crypto";
import { TypeUser } from '../models/LoginRequest';
import { Response, TypeResponse } from '../models/Response';
import { TipoUsuario } from '../entities/TipoUsuario';
import { Cliente } from '../entities/Cliente';
import { Usuario } from '../entities/Usuario';
import { Domiciliario } from '../entities/Domiciliario';
import { EmailBusiness } from './EmailBusiness';
import { PushTokenRequest } from '../models/PushTokenRequest';
import { PushNotificationData } from '../entities/PushNotificationData';
import { DomiciliarioPos } from '../entities/DomiciliarioPos';



export class SecurityBusiness {
    async Login(UserName: string, Clave: string, Type: TypeUser): Promise<Response> {
        var response = new Response();
        switch (Type) {
            case TypeUser.Cliente:
                var data = await getManager().getRepository(Cliente).findOne({
                    where: {
                        correo: UserName,
                        contrasena: Clave
                    },
                    relations: ["direccionClientes", "direccionClientes.idCiudad"]
                });
                if (data != null) {
                    response.Message = "";
                    response.Type = TypeResponse.Ok;
                    response.Value = JSON.stringify(data);
                }
                else {
                    response.Message = "Cliente no existe o contraseña incorrecta";
                    response.Type = TypeResponse.Error;
                    response.Value = null;
                }
                break;
            case TypeUser.Domiciliario:
                var domi = await getManager().getRepository(Domiciliario).findOne({
                    where: {
                        userLogin: UserName,
                        passwordLogin: Clave
                    },
                    relations: [
                        "idMarca",
                        "idTipoVehiculo"
                    ]
                });
                if (domi != null) {
                    response.Message = "";
                    response.Type = TypeResponse.Ok;
                    response.Value = JSON.stringify(domi);
                }
                else {
                    response.Message = "Domiciliario no existe o contraseña incorrecta";
                    response.Type = TypeResponse.Error;
                    response.Value = null;
                }
                break;
            case TypeUser.Establecimiento:
                var usu = await getManager().getRepository(Usuario).findOne({
                    where: {
                        userLogin: UserName,
                        passwordLogin: Clave,
                    }
                });
                if (usu != null) {
                    response.Message = "";
                    response.Type = TypeResponse.Ok;
                    response.Value = JSON.stringify(usu);
                }
                else {
                    response.Message = "Usuario no existe o contraseña incorrecta";
                    response.Type = TypeResponse.Error;
                    response.Value = null;
                }
                break;
            case TypeUser.Administrador:
                var admim = await getManager().getRepository(Usuario).findOne({
                    where: {
                        userLogin: UserName,
                        passwordLogin: Clave,
                    }
                });
                if (admim != null) {
                    response.Message = "";
                    response.Type = TypeResponse.Ok;
                    response.Value = JSON.stringify(admim);
                }
                else {
                    response.Message = "Usuario no existe o contraseña incorrecta";
                    response.Type = TypeResponse.Error;
                    response.Value = null;
                }
                break;
            default:
                response.Message = "Tipo de usuario inválido";
                response.Type = TypeResponse.Error;
                response.Value = null;
                break;
        }
        return response;
    }

    async Logout(idDomiciliario: number) {
        var usr = await getManager().getRepository(DomiciliarioPos).findOne({ where: { idUsuario: idDomiciliario } });
        if (usr != null) {
            usr.activo = false;
            usr = await getManager().getRepository(DomiciliarioPos).save(usr);
        }
        return true;
    }

    UpdatePassword(Id: number, NewPassword: string, Type: number) {
        switch (Type) {
            case TypeUser.Cliente:
                var data = getManager().getRepository(Cliente).findOne({ id: Id });
                data.then((result) => {
                    if (result != null) {
                        result.contrasena = NewPassword;
                        getManager().getRepository(Cliente).save(result);
                    }
                });
                break;
            case TypeUser.Domiciliario:
                var data1 = getManager().getRepository(Domiciliario).findOne({ id: Id });
                data1.then((result) => {
                    if (result != null) {
                        result.passwordLogin = NewPassword;
                        getManager().getRepository(Domiciliario).save(result);
                    }
                });
                break;
            case TypeUser.Establecimiento:
                var data2 = getManager().getRepository(Usuario).findOne({ id: Id });
                data2.then((result) => {
                    if (result != null) {
                        result.passwordLogin = NewPassword;
                        getManager().getRepository(Usuario).save(result);
                    }
                });
                break;
            case TypeUser.Administrador:
                var data3 = getManager().getRepository(Usuario).findOne({ id: Id });
                data3.then((result) => {
                    if (result != null) {
                        result.passwordLogin = NewPassword;
                        getManager().getRepository(Usuario).save(result);
                    }
                });
                break;
        }
    }

    async RecoverPassword(Email: string, Type: number): Promise<boolean> {
        switch (Type) {
            case TypeUser.Cliente:
                var exist = await getManager().getRepository(Cliente).findOne({ where: { correo: Email } });
                if (exist) {
                    var newPwd = this.MakePwd(10);
                    exist.contrasena = createHash('md5').update(newPwd).digest("hex");
                    getManager().getRepository(Cliente).save(exist);
                    var message = "" + exist.nombre + "\n\r A continuación le enviamos su nueva contraseña: \n\r" + newPwd;
                    new EmailBusiness().SendMail(exist.correo, "Recuperación de contraseña", message);
                    return true;
                }
                else {
                    return false;
                }
                break;
            case TypeUser.Domiciliario:
                var exist1 = await getManager().getRepository(Domiciliario).findOne({ where: { correo: Email } });
                if (exist1) {
                    var newPwd = this.MakePwd(10);
                    exist1.passwordLogin = createHash('md5').update(newPwd).digest("hex");
                    getManager().getRepository(Domiciliario).save(exist1);
                    var message = "" + exist1.nombre + "\n\r A continuación le enviamos su nueva contraseña: \n\r" + newPwd;
                    new EmailBusiness().SendMail(exist1.correo, "Recuperación de contraseña", message);
                    return true;
                }
                else {
                    return false;
                }
                break;
            case TypeUser.Establecimiento:
                var exist2 = await getManager().getRepository(Usuario).findOne({ where: { correo: Email } });
                if (exist2) {
                    var newPwd = this.MakePwd(10);
                    exist2.passwordLogin = createHash('md5').update(newPwd).digest("hex");
                    getManager().getRepository(Usuario).save(exist2);
                    var message = "" + exist2.nombres + "\n\r A continuación le enviamos su nueva contraseña: \n\r" + newPwd;
                    new EmailBusiness().SendMail(exist2.correo, "Recuperación de contraseña", message);
                    return true;
                }
                else {
                    return false;
                }
                break;
            case TypeUser.Administrador:
                var exist3 = await getManager().getRepository(Usuario).findOne({ where: { correo: Email } });
                if (exist3) {
                    var newPwd = this.MakePwd(10);
                    exist3.passwordLogin = createHash('md5').update(newPwd).digest("hex");
                    getManager().getRepository(Usuario).save(exist3);
                    var message = "" + exist3.nombres + "\n\r A continuación le enviamos su nueva contraseña: \n\r" + newPwd;
                    new EmailBusiness().SendMail(exist3.correo, "Recuperación de contraseña", message);
                    return true;
                }
                else {
                    return false;
                }
                break;
        }
    }

    MakePwd(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async UpdatePushToken(pushNotData: PushTokenRequest) {
        var push = await getManager().getRepository(PushNotificationData).findOne({ where: { idUser: pushNotData.IdUsuario } });
        if (push != null) {
            push.pushId = pushNotData.PlayerId;
            push.pushToken = pushNotData.PushToken;
        }
        else {
            push = new PushNotificationData();
            push.idUser = pushNotData.IdUsuario;
            push.pushId = pushNotData.PlayerId;
            push.pushToken = pushNotData.PushToken;
            push.typeUser = pushNotData.TypeUser;
        }
        return getManager().getRepository(PushNotificationData).save(push);
    }
}
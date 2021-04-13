import { ConnectionOptions } from "typeorm";
import { Cajero } from "./entities/Cajero";
import { Categoria } from "./entities/Categoria";
import { Cliente } from "./entities/Cliente";
import { Departamento } from "./entities/Departamento";
import { DireccionCliente } from "./entities/DireccionCliente";
import { Domiciliario } from "./entities/Domiciliario";
import { DomiciliarioPos } from "./entities/DomiciliarioPos";
import { DomiciliarioRequest } from "./entities/DomiciliarioRequest";
import { EstadoServicio } from "./entities/EstadoServicio";
import { Factura } from "./entities/Factura";
import { Marca } from "./entities/Marca";
import { MedioPago } from "./entities/MedioPago";
import { Municipio } from "./entities/Municipio";
import { Pago } from "./entities/Pago";
import { Pais } from "./entities/Pais";
import { Parametros } from "./entities/Parametros";
import { Servicio } from "./entities/Servicio";
import { Producto } from "./entities/Producto";
import { ProductosServicio } from "./entities/ProductosServicio";
import { PushNotificationData } from "./entities/PushNotificationData";
import { RecoveryPassword } from "./entities/RecoveryPassword";
import { Responsable } from "./entities/Responsable";
import { TiposIdentificacion } from "./entities/TiposIdentificacion";
import { TipoUsuario } from "./entities/TipoUsuario";
import { TipoVehiculo } from "./entities/TipoVehiculo";
import { Usuario } from "./entities/Usuario";
import { PlanesCliente } from "./entities/PlanesCliente";
import { Planes } from "./entities/Planes";
import { ConfiguracionPlanes } from "./entities/ConfiguracionPlanes";
import { DomiciliarioProductos } from "./entities/DomiciliarioProductos";

const dbConfig: ConnectionOptions = {
    type: "mssql",
    host: "rationalsoftware.ddns.net",
    port: 1433,
    username: "sa",
    password: "$lcs1648_*",
    database: "Appsistonio",
    schema: "dbo",
    entities: [
      Cajero,
      Categoria,
      Cliente,
      ConfiguracionPlanes,
      Departamento,
      DireccionCliente,
      Domiciliario,
      DomiciliarioPos,
      DomiciliarioProductos,
      DomiciliarioRequest,
      EstadoServicio,
      Factura,
      Marca,
      MedioPago,
      Municipio,
      Planes,
      Pago,
      Pais,
      PlanesCliente,
      Parametros,
      Servicio,
      Producto,
      ProductosServicio,
      PushNotificationData,
      RecoveryPassword,
      Responsable,
      TipoUsuario,
      TiposIdentificacion,
      TipoVehiculo,
      Usuario
    ],
    synchronize: false,
    logging: false,
    options: {
      "enableArithAbort": true
    }
}

export { dbConfig };

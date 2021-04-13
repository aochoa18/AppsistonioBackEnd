import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "./Municipio";
import { Marca } from "./Marca";
import { TipoVehiculo } from "./TipoVehiculo";
import { DomiciliarioPos } from "./DomiciliarioPos";
import { DomiciliarioProductos } from "./DomiciliarioProductos";
import { DomiciliarioRequest } from "./DomiciliarioRequest";
import { Servicio } from "./Servicio";

@Index("PK_Domiciliario", ["id"], { unique: true })
@Entity("Domiciliario", { schema: "dbo" })
export class Domiciliario {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("varchar", { name: "Documento", nullable: true, length: 20 })
  documento: string | null;

  @Column("varchar", { name: "Direccion", nullable: true, length: 200 })
  direccion: string | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "Celular", nullable: true, length: 20 })
  celular: string | null;

  @Column("varchar", { name: "Modelo", length: 10 })
  modelo: string;

  @Column("varchar", { name: "Placa", length: 10 })
  placa: string;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("int", { name: "IdUsuarioRegistro" })
  idUsuarioRegistro: number;

  @Column("varchar", { name: "UserLogin", length: 50 })
  userLogin: string;

  @Column("varchar", { name: "PasswordLogin", nullable: true, length: 130 })
  passwordLogin: string | null;

  @Column("varchar", { name: "Correo", nullable: true, length: 100 })
  correo: string | null;

  @Column("varchar", { name: "ImagenDocumento", nullable: true, length: 1000 })
  imagenDocumento: string | null;

  @Column("varchar", { name: "ImagenPase", nullable: true, length: 1000 })
  imagenPase: string | null;

  @Column("varchar", { name: "ImagenSoat", nullable: true, length: 1000 })
  imagenSoat: string | null;

  @Column("varchar", {
    name: "ImagenTarjetaPropiedad",
    nullable: true,
    length: 1000,
  })
  imagenTarjetaPropiedad: string | null;

  @Column("varchar", { name: "ImagenFoto", nullable: true, length: 500 })
  imagenFoto: string | null;

  @ManyToOne(() => Municipio, (municipio) => municipio.domiciliarios)
  @JoinColumn([{ name: "IdMunicipio", referencedColumnName: "id" }])
  idMunicipio: Municipio;

  @ManyToOne(() => Marca, (marca) => marca.domiciliarios)
  @JoinColumn([{ name: "IdMarca", referencedColumnName: "id" }])
  idMarca: Marca;

  @ManyToOne(() => TipoVehiculo, (tipoVehiculo) => tipoVehiculo.domiciliarios)
  @JoinColumn([{ name: "IdTipoVehiculo", referencedColumnName: "id" }])
  idTipoVehiculo: TipoVehiculo;

  @OneToOne(
    () => DomiciliarioPos,
    (domiciliarioPos) => domiciliarioPos.idUsuario2
  )
  domiciliarioPos: DomiciliarioPos;

  @OneToMany(
    () => DomiciliarioProductos,
    (domiciliarioProductos) => domiciliarioProductos.idDomiciliario
  )
  domiciliarioProductos: DomiciliarioProductos[];

  @OneToMany(
    () => DomiciliarioRequest,
    (domiciliarioRequest) => domiciliarioRequest.idDomiciliario2
  )
  domiciliarioRequests: DomiciliarioRequest[];

  @OneToMany(() => Servicio, (servicio) => servicio.idDomiciliario)
  servicios: Servicio[];
}

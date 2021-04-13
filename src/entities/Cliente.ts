import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Departamento } from "./Departamento";
import { Municipio } from "./Municipio";
import { Pais } from "./Pais";
import { DireccionCliente } from "./DireccionCliente";
import { PlanesCliente } from "./PlanesCliente";
import { Servicio } from "./Servicio";

@Index("PK_Cliente", ["id"], { unique: true })
@Entity("Cliente", { schema: "dbo" })
export class Cliente {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("varchar", { name: "Documento", nullable: true, length: 20 })
  documento: string | null;

  @Column("varchar", { name: "Correo", nullable: true, length: 200 })
  correo: string | null;

  @Column("varchar", { name: "Direccion", nullable: true, length: 150 })
  direccion: string | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "Celular", nullable: true, length: 20 })
  celular: string | null;

  @Column("varchar", { name: "Contrasena", nullable: true, length: 32 })
  contrasena: string | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @ManyToOne(() => Departamento, (departamento) => departamento.clientes)
  @JoinColumn([{ name: "IdDepto", referencedColumnName: "id" }])
  idDepto: Departamento;

  @ManyToOne(() => Municipio, (municipio) => municipio.clientes)
  @JoinColumn([{ name: "IdMunicipio", referencedColumnName: "id" }])
  idMunicipio: Municipio;

  @ManyToOne(() => Pais, (pais) => pais.clientes)
  @JoinColumn([{ name: "IdPais", referencedColumnName: "id" }])
  idPais: Pais;

  @OneToMany(
    () => DireccionCliente,
    (direccionCliente) => direccionCliente.idUsuario
  )
  direccionClientes: DireccionCliente[];

  @OneToMany(() => PlanesCliente, (planesCliente) => planesCliente.idCliente)
  planesClientes: PlanesCliente[];

  @OneToMany(() => Servicio, (servicio) => servicio.idCliente)
  servicios: Servicio[];
}

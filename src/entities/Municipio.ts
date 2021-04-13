import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cliente } from "./Cliente";
import { DireccionCliente } from "./DireccionCliente";
import { Domiciliario } from "./Domiciliario";
import { Departamento } from "./Departamento";
import { Responsable } from "./Responsable";
import { Servicio } from "./Servicio";

@Index("PK_Municipio", ["id"], { unique: true })
@Entity("Municipio", { schema: "dbo" })
export class Municipio {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @OneToMany(() => Cliente, (cliente) => cliente.idMunicipio)
  clientes: Cliente[];

  @OneToMany(
    () => DireccionCliente,
    (direccionCliente) => direccionCliente.idCiudad
  )
  direccionClientes: DireccionCliente[];

  @OneToMany(() => Domiciliario, (domiciliario) => domiciliario.idMunicipio)
  domiciliarios: Domiciliario[];

  @ManyToOne(() => Departamento, (departamento) => departamento.municipios)
  @JoinColumn([{ name: "IdDepto", referencedColumnName: "id" }])
  idDepto: Departamento;

  @OneToMany(() => Responsable, (responsable) => responsable.idMunicipio)
  responsables: Responsable[];

  @OneToMany(() => Servicio, (servicio) => servicio.idMunicipio)
  servicios: Servicio[];
}

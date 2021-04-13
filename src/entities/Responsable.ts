import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "./Municipio";
import { Pais } from "./Pais";
import { Departamento } from "./Departamento";

@Index("PK_Responsable", ["id"], { unique: true })
@Entity("Responsable", { schema: "dbo" })
export class Responsable {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("varchar", { name: "Documento", nullable: true, length: 20 })
  documento: string | null;

  @Column("varchar", { name: "Direccion", nullable: true, length: 150 })
  direccion: string | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "Celular", nullable: true, length: 20 })
  celular: string | null;

  @Column("varchar", { name: "Correo", nullable: true, length: 150 })
  correo: string | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("int", { name: "IdUsuarioRegistro", nullable: true })
  idUsuarioRegistro: number | null;

  @ManyToOne(() => Municipio, (municipio) => municipio.responsables)
  @JoinColumn([{ name: "IdMunicipio", referencedColumnName: "id" }])
  idMunicipio: Municipio;

  @ManyToOne(() => Pais, (pais) => pais.responsables)
  @JoinColumn([{ name: "IdPais", referencedColumnName: "id" }])
  idPais: Pais;

  @ManyToOne(() => Departamento, (departamento) => departamento.responsables)
  @JoinColumn([{ name: "IdDepto", referencedColumnName: "id" }])
  idDepto: Departamento;
}

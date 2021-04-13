import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cliente } from "./Cliente";
import { Departamento } from "./Departamento";
import { Responsable } from "./Responsable";

@Index("PK_Pais", ["id"], { unique: true })
@Entity("Pais", { schema: "dbo" })
export class Pais {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @OneToMany(() => Cliente, (cliente) => cliente.idPais)
  clientes: Cliente[];

  @OneToMany(() => Departamento, (departamento) => departamento.idPais)
  departamentos: Departamento[];

  @OneToMany(() => Responsable, (responsable) => responsable.idPais)
  responsables: Responsable[];
}

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
import { Pais } from "./Pais";
import { Municipio } from "./Municipio";
import { Responsable } from "./Responsable";

@Index("PK_Departamento", ["id"], { unique: true })
@Entity("Departamento", { schema: "dbo" })
export class Departamento {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @OneToMany(() => Cliente, (cliente) => cliente.idDepto)
  clientes: Cliente[];

  @ManyToOne(() => Pais, (pais) => pais.departamentos)
  @JoinColumn([{ name: "IdPais", referencedColumnName: "id" }])
  idPais: Pais;

  @OneToMany(() => Municipio, (municipio) => municipio.idDepto)
  municipios: Municipio[];

  @OneToMany(() => Responsable, (responsable) => responsable.idDepto)
  responsables: Responsable[];
}

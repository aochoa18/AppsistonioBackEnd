import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Domiciliario } from "./Domiciliario";

@Index("PK_Marca", ["id"], { unique: true })
@Entity("Marca", { schema: "dbo" })
export class Marca {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("int", { name: "IdUsuarioRegistro", nullable: true })
  idUsuarioRegistro: number | null;

  @OneToMany(() => Domiciliario, (domiciliario) => domiciliario.idMarca)
  domiciliarios: Domiciliario[];
}

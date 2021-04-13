import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Domiciliario } from "./Domiciliario";

@Index("PK_TipoVehiculo", ["id"], { unique: true })
@Entity("TipoVehiculo", { schema: "dbo" })
export class TipoVehiculo {
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

  @OneToMany(() => Domiciliario, (domiciliario) => domiciliario.idTipoVehiculo)
  domiciliarios: Domiciliario[];
}

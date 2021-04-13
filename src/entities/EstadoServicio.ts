import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Servicio } from "./Servicio";

@Index("PK_EstadoPedido", ["id"], { unique: true })
@Entity("EstadoServicio", { schema: "dbo" })
export class EstadoServicio {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @OneToMany(() => Servicio, (servicio) => servicio.idEstadoServicio)
  servicios: Servicio[];
}

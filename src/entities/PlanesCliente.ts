import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Planes } from "./Planes";
import { Cliente } from "./Cliente";

@Index("PK__PlanesCl__3214EC0763C40762", ["id"], { unique: true })
@Entity("PlanesCliente", { schema: "dbo" })
export class PlanesCliente {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("datetime", { name: "Desde", nullable: true })
  desde: Date | null;

  @Column("datetime", { name: "Hasta", nullable: true })
  hasta: Date | null;

  @Column("varchar", { name: "Periodo", nullable: true, length: 200 })
  periodo: string | null;

  @ManyToOne(() => Planes, (planes) => planes.planesClientes)
  @JoinColumn([{ name: "IdPlan", referencedColumnName: "id" }])
  idPlan: Planes;

  @ManyToOne(() => Cliente, (cliente) => cliente.planesClientes)
  @JoinColumn([{ name: "IdCliente", referencedColumnName: "id" }])
  idCliente: Cliente;
}

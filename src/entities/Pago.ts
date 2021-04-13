import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MedioPago } from "./MedioPago";
import { Servicio } from "./Servicio";

@Index("Pago_PK", ["id"], { unique: true })
@Index("Pago_UN", ["id"], { unique: true })
@Entity("Pago", { schema: "dbo" })
export class Pago {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("uniqueidentifier", { name: "TransactionId", nullable: true })
  transactionId: string | null;

  @Column("numeric", { name: "Valor", precision: 18, scale: 4 })
  valor: number;

  @Column("varchar", { name: "EstadoTransaccion", length: 20 })
  estadoTransaccion: string;

  @Column("datetime", {
    name: "FechaCreacion",
    nullable: true,
    default: () => "getdate()",
  })
  fechaCreacion: Date | null;

  @Column("datetime", { name: "FechaRespuesta", nullable: true })
  fechaRespuesta: Date | null;

  @ManyToOne(() => MedioPago, (medioPago) => medioPago.pagos)
  @JoinColumn([{ name: "IdMedioPago", referencedColumnName: "id" }])
  idMedioPago: MedioPago;

  @ManyToOne(() => Servicio, (servicio) => servicio.pagos)
  @JoinColumn([{ name: "idPedido", referencedColumnName: "id" }])
  idPedido: Servicio;
}

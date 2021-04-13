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

@Index("PK_Factura", ["id"], { unique: true })
@Entity("Factura", { schema: "dbo" })
export class Factura {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "NoFactura", nullable: true, length: 10 })
  noFactura: string | null;

  @Column("int", { name: "Items", nullable: true })
  items: number | null;

  @Column("float", { name: "SubTotal", nullable: true, precision: 53 })
  subTotal: number | null;

  @Column("float", { name: "Impuestos", nullable: true, precision: 53 })
  impuestos: number | null;

  @Column("float", { name: "Otros", nullable: true, precision: 53 })
  otros: number | null;

  @Column("float", { name: "Total", nullable: true, precision: 53 })
  total: number | null;

  @Column("int", { name: "IdCajero", nullable: true })
  idCajero: number | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @ManyToOne(() => MedioPago, (medioPago) => medioPago.facturas)
  @JoinColumn([{ name: "IdMedioPago", referencedColumnName: "id" }])
  idMedioPago: MedioPago;

  @ManyToOne(() => Servicio, (servicio) => servicio.facturas)
  @JoinColumn([{ name: "IdPedido", referencedColumnName: "id" }])
  idPedido: Servicio;
}

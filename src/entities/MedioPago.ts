import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Factura } from "./Factura";
import { Pago } from "./Pago";

@Index("PK_MedioPago", ["id"], { unique: true })
@Entity("MedioPago", { schema: "dbo" })
export class MedioPago {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 30 })
  nombre: string | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("int", { name: "IdUsuarioRegistro", nullable: true })
  idUsuarioRegistro: number | null;

  @OneToMany(() => Factura, (factura) => factura.idMedioPago)
  facturas: Factura[];

  @OneToMany(() => Pago, (pago) => pago.idMedioPago)
  pagos: Pago[];
}

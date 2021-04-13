import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Planes } from "./Planes";
import { Producto } from "./Producto";

@Index("PK__Configur__3214EC07201F731C", ["id"], { unique: true })
@Entity("ConfiguracionPlanes", { schema: "dbo" })
export class ConfiguracionPlanes {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Cantidad", nullable: true })
  cantidad: number | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @ManyToOne(() => Planes, (planes) => planes.configuracionPlanes)
  @JoinColumn([{ name: "IdPlan", referencedColumnName: "id" }])
  idPlan: Planes;

  @ManyToOne(() => Producto, (producto) => producto.configuracionPlanes)
  @JoinColumn([{ name: "IdProducto", referencedColumnName: "id" }])
  idProducto: Producto;
}

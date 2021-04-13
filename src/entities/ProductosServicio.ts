import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto";
import { Servicio } from "./Servicio";

@Index("PK_ProductosPedido", ["id"], { unique: true })
@Entity("ProductosServicio", { schema: "dbo" })
export class ProductosServicio {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "IdPlan", nullable: true })
  idPlan: number | null;

  @Column("int", { name: "Cantidad", nullable: true })
  cantidad: number | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("float", { name: "Precio", nullable: true, precision: 53 })
  precio: number | null;

  @ManyToOne(() => Producto, (producto) => producto.productosServicios)
  @JoinColumn([{ name: "IdProducto", referencedColumnName: "id" }])
  idProducto: Producto;

  @ManyToOne(() => Servicio, (servicio) => servicio.productosServicios)
  @JoinColumn([{ name: "IdPedido", referencedColumnName: "id" }])
  idPedido: Servicio;
}

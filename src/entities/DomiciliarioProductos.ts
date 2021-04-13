import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Domiciliario } from "./Domiciliario";
import { Producto } from "./Producto";

@Index("PK__Domicili__3214EC074C6F39D6", ["id"], { unique: true })
@Entity("DomiciliarioProductos", { schema: "dbo" })
export class DomiciliarioProductos {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @ManyToOne(
    () => Domiciliario,
    (domiciliario) => domiciliario.domiciliarioProductos
  )
  @JoinColumn([{ name: "IdDomiciliario", referencedColumnName: "id" }])
  idDomiciliario: Domiciliario;

  @ManyToOne(() => Producto, (producto) => producto.domiciliarioProductos)
  @JoinColumn([{ name: "IdProducto", referencedColumnName: "id" }])
  idProducto: Producto;
}

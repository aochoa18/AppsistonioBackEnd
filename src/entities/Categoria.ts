import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Producto } from "./Producto";

@Index("PK_CategoriaEstablecimiento", ["id"], { unique: true })
@Entity("Categoria", { schema: "dbo" })
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("varchar", { name: "Descripcion", nullable: true, length: 2000 })
  descripcion: string | null;

  @Column("bit", { name: "Estado", nullable: true, default: () => "(1)" })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("int", { name: "IdUsuarioRegistro", nullable: true })
  idUsuarioRegistro: number | null;

  @Column("text", { name: "Imagen", nullable: true })
  imagen: string | null;

  @OneToMany(() => Producto, (producto) => producto.idCategoria)
  productos: Producto[];
}

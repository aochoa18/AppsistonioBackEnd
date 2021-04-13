import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ConfiguracionPlanes } from "./ConfiguracionPlanes";
import { DomiciliarioProductos } from "./DomiciliarioProductos";
import { Categoria } from "./Categoria";
import { ProductosServicio } from "./ProductosServicio";

@Index("PK_Producto", ["id"], { unique: true })
@Entity("Producto", { schema: "dbo" })
export class Producto {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("varchar", { name: "Descripcion", nullable: true, length: 1000 })
  descripcion: string | null;

  @Column("varchar", { name: "Presentacion", nullable: true, length: 100 })
  presentacion: string | null;

  @Column("float", { name: "Precio", nullable: true, precision: 53 })
  precio: number | null;

  @Column("varchar", { name: "Imagen", nullable: true, length: 500 })
  imagen: string | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("int", { name: "IdUsuarioRegistro", nullable: true })
  idUsuarioRegistro: number | null;

  @Column("varchar", { name: "CodigoSKU", nullable: true, length: 100 })
  codigoSku: string | null;

  @Column("float", { name: "PrecioPromocion", nullable: true, precision: 53 })
  precioPromocion: number | null;

  @Column("float", {
    name: "PorcentajePromocion",
    nullable: true,
    precision: 53,
  })
  porcentajePromocion: number | null;

  @Column("varchar", { name: "Codigo", nullable: true, length: 15 })
  codigo: string | null;

  @OneToMany(
    () => ConfiguracionPlanes,
    (configuracionPlanes) => configuracionPlanes.idProducto
  )
  configuracionPlanes: ConfiguracionPlanes[];

  @OneToMany(
    () => DomiciliarioProductos,
    (domiciliarioProductos) => domiciliarioProductos.idProducto
  )
  domiciliarioProductos: DomiciliarioProductos[];

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn([{ name: "IdCategoria", referencedColumnName: "id" }])
  idCategoria: Categoria;

  @OneToMany(
    () => ProductosServicio,
    (productosServicio) => productosServicio.idProducto
  )
  productosServicios: ProductosServicio[];
}

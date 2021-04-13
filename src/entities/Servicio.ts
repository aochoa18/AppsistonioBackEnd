import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DomiciliarioRequest } from "./DomiciliarioRequest";
import { Factura } from "./Factura";
import { Pago } from "./Pago";
import { ProductosServicio } from "./ProductosServicio";
import { Domiciliario } from "./Domiciliario";
import { Cliente } from "./Cliente";
import { EstadoServicio } from "./EstadoServicio";
import { Municipio } from "./Municipio";

@Index("PK_Pedido", ["id"], { unique: true })
@Entity("Servicio", { schema: "dbo" })
export class Servicio {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Direccion", nullable: true, length: 100 })
  direccion: string | null;

  @Column("varchar", { name: "Observaciones", nullable: true, length: 2000 })
  observaciones: string | null;

  @Column("datetime", { name: "FechaEntrega", nullable: true })
  fechaEntrega: Date | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("float", { name: "geolat", nullable: true, precision: 53 })
  geolat: number | null;

  @Column("float", { name: "geolon", nullable: true, precision: 53 })
  geolon: number | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @OneToMany(
    () => DomiciliarioRequest,
    (domiciliarioRequest) => domiciliarioRequest.idPedido2
  )
  domiciliarioRequests: DomiciliarioRequest[];

  @OneToMany(() => Factura, (factura) => factura.idPedido)
  facturas: Factura[];

  @OneToMany(() => Pago, (pago) => pago.idPedido)
  pagos: Pago[];

  @OneToMany(
    () => ProductosServicio,
    (productosServicio) => productosServicio.idPedido
  )
  productosServicios: ProductosServicio[];

  @ManyToOne(() => Domiciliario, (domiciliario) => domiciliario.servicios)
  @JoinColumn([{ name: "IdDomiciliario", referencedColumnName: "id" }])
  idDomiciliario: Domiciliario;

  @ManyToOne(() => Cliente, (cliente) => cliente.servicios)
  @JoinColumn([{ name: "IdCliente", referencedColumnName: "id" }])
  idCliente: Cliente;

  @ManyToOne(() => EstadoServicio, (estadoServicio) => estadoServicio.servicios)
  @JoinColumn([{ name: "IdEstadoServicio", referencedColumnName: "id" }])
  idEstadoServicio: EstadoServicio;

  @ManyToOne(() => Municipio, (municipio) => municipio.servicios)
  @JoinColumn([{ name: "IdMunicipio", referencedColumnName: "id" }])
  idMunicipio: Municipio;
}

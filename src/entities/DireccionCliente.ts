import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "./Municipio";
import { Cliente } from "./Cliente";

@Index("DireccionUsuario_PK", ["id"], { unique: true })
@Index("DireccionUsuario_UN", ["id"], { unique: true })
@Entity("DireccionCliente", { schema: "dbo" })
export class DireccionCliente {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Direccion", length: 255 })
  direccion: string;

  @Column("bit", { name: "Estado", default: () => "(1)" })
  estado: boolean;

  @Column("bit", { name: "EsDefault", default: () => "(0)" })
  esDefault: boolean;

  @Column("varchar", { name: "Complemento", nullable: true, length: 255 })
  complemento: string | null;

  @Column("decimal", {
    name: "GeoLat",
    nullable: true,
    precision: 18,
    scale: 6,
  })
  geoLat: number | null;

  @Column("decimal", {
    name: "GeoLon",
    nullable: true,
    precision: 18,
    scale: 6,
  })
  geoLon: number | null;

  @ManyToOne(() => Municipio, (municipio) => municipio.direccionClientes)
  @JoinColumn([{ name: "IdCiudad", referencedColumnName: "id" }])
  idCiudad: Municipio;

  @ManyToOne(() => Cliente, (cliente) => cliente.direccionClientes)
  @JoinColumn([{ name: "IdUsuario", referencedColumnName: "id" }])
  idUsuario: Cliente;
}

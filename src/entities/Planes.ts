import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ConfiguracionPlanes } from "./ConfiguracionPlanes";
import { PlanesCliente } from "./PlanesCliente";

@Index("PK__Planes__3214EC07AEAEDFC9", ["id"], { unique: true })
@Entity("Planes", { schema: "dbo" })
export class Planes {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 200 })
  nombre: string | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("float", { name: "Precio", nullable: true, precision: 53 })
  precio: number | null;

  @Column("int", { name: "Dias", nullable: true })
  dias: number | null;

  @OneToMany(
    () => ConfiguracionPlanes,
    (configuracionPlanes) => configuracionPlanes.idPlan
  )
  configuracionPlanes: ConfiguracionPlanes[];

  @OneToMany(() => PlanesCliente, (planesCliente) => planesCliente.idPlan)
  planesClientes: PlanesCliente[];
}

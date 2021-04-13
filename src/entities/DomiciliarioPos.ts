import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Domiciliario } from "./Domiciliario";

@Index("DomiciliarioPos_PK", ["idUsuario"], { unique: true })
@Index("DomiciliarioPos_UN", ["idUsuario"], { unique: true })
@Entity("DomiciliarioPos", { schema: "dbo" })
export class DomiciliarioPos {
  @Column("int", { primary: true, name: "idUsuario" })
  idUsuario: number;

  @Column("float", { name: "lat", precision: 53, default: () => "(0)" })
  lat: number;

  @Column("float", { name: "lon", precision: 53, default: () => "(0)" })
  lon: number;

  @Column("bit", { name: "activo", default: () => "(0)" })
  activo: boolean;

  @Column("bit", { name: "enEntrega", default: () => "(0)" })
  enEntrega: boolean;

  @OneToOne(() => Domiciliario, (domiciliario) => domiciliario.domiciliarioPos)
  @JoinColumn([{ name: "idUsuario", referencedColumnName: "id" }])
  idUsuario2: Domiciliario;
}

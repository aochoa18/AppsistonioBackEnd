import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Servicio } from "./Servicio";
import { Domiciliario } from "./Domiciliario";

@Index("DomiciliarioRequest_PK", ["idDomiciliario", "idPedido"], {
  unique: true,
})
@Index("DomiciliarioRequest_UN", ["idDomiciliario", "idPedido"], {
  unique: true,
})
@Entity("DomiciliarioRequest", { schema: "dbo" })
export class DomiciliarioRequest {
  @Column("int", { primary: true, name: "idDomiciliario" })
  idDomiciliario: number;

  @Column("int", { primary: true, name: "idPedido" })
  idPedido: number;

  @Column("int", { name: "respuesta", default: () => "(1)" })
  respuesta: number;

  @ManyToOne(() => Servicio, (servicio) => servicio.domiciliarioRequests)
  @JoinColumn([{ name: "idPedido", referencedColumnName: "id" }])
  idPedido2: Servicio;

  @ManyToOne(
    () => Domiciliario,
    (domiciliario) => domiciliario.domiciliarioRequests
  )
  @JoinColumn([{ name: "idDomiciliario", referencedColumnName: "id" }])
  idDomiciliario2: Domiciliario;
}

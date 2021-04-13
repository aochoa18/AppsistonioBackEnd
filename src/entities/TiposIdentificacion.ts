import { Column, Entity, Index } from "typeorm";

@Index("PK__TiposIde__3214EC0748057E6F", ["id"], { unique: true })
@Entity("TiposIdentificacion", { schema: "dbo" })
export class TiposIdentificacion {
  @Column("int", { primary: true, name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", length: 100 })
  nombre: string;

  @Column("bit", { name: "Estado", default: () => "(1)" })
  estado: boolean;

  @Column("datetime", {
    name: "FechaRegistro",
    nullable: true,
    default: () => "getdate()",
  })
  fechaRegistro: Date | null;
}

import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__CostoEnv__3214EC27E5ACE766", ["id"], { unique: true })
@Entity("CostoEnvio", { schema: "dbo" })
export class CostoEnvio {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "RangoInicioKm", nullable: true })
  rangoInicioKm: number | null;

  @Column("int", { name: "RangoFinalKm", nullable: true })
  rangoFinalKm: number | null;

  @Column("int", { name: "Precio", nullable: true })
  precio: number | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro", nullable: true })
  fechaRegistro: Date | null;

  @Column("int", { name: "IdUsuarioRegistra", nullable: true })
  idUsuarioRegistra: number | null;
}

import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Cajero__3214EC078F8B8F8C", ["id"], { unique: true })
@Entity("Cajero", { schema: "dbo" })
export class Cajero {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", nullable: true, length: 100 })
  nombre: string | null;

  @Column("varchar", { name: "Documento", nullable: true, length: 20 })
  documento: string | null;

  @Column("varchar", { name: "Correo", nullable: true, length: 200 })
  correo: string | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 20 })
  telefono: string | null;

  @Column("varchar", { name: "Celular", nullable: true, length: 20 })
  celular: string | null;

  @Column("int", { name: "IdPais", nullable: true })
  idPais: number | null;

  @Column("int", { name: "IdDepto", nullable: true })
  idDepto: number | null;

  @Column("int", { name: "IdMunicipio", nullable: true })
  idMunicipio: number | null;

  @Column("varchar", { name: "Direccion", nullable: true, length: 150 })
  direccion: string | null;

  @Column("varchar", { name: "Contrasena", nullable: true, length: 20 })
  contrasena: string | null;
}

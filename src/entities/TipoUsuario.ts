import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Index("PK__TipoUsua__3214EC07456A01BF", ["id"], { unique: true })
@Entity("TipoUsuario", { schema: "dbo" })
export class TipoUsuario {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Nombre", length: 100 })
  nombre: string;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @Column("datetime", { name: "FechaRegistro" })
  fechaRegistro: Date;

  @Column("int", { name: "IdUsuario", nullable: true })
  idUsuario: number | null;

  @OneToMany(() => Usuario, (usuario) => usuario.idTipoUsuario)
  usuarios: Usuario[];
}

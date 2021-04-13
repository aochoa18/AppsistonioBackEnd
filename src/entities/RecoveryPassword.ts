import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";

@Index("PK__Recovery__3214EC270A8B97B9", ["id"], { unique: true })
@Entity("RecoveryPassword", { schema: "dbo" })
export class RecoveryPassword {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "Token", nullable: true, length: 255 })
  token: string | null;

  @Column("datetime", { name: "FechaCreacion", nullable: true })
  fechaCreacion: Date | null;

  @Column("datetime", { name: "FechaVencimiento", nullable: true })
  fechaVencimiento: Date | null;

  @Column("bit", { name: "Estado", nullable: true })
  estado: boolean | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.recoveryPasswords)
  @JoinColumn([{ name: "IdUsuario", referencedColumnName: "id" }])
  idUsuario: Usuario;
}

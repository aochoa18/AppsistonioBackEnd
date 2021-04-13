import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RecoveryPassword } from "./RecoveryPassword";
import { TipoUsuario } from "./TipoUsuario";

@Index("PK__Usuario__3214EC27CF1E5A98", ["id"], { unique: true })
@Entity("Usuario", { schema: "dbo" })
export class Usuario {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "Nombres", length: 100 })
  nombres: string;

  @Column("varchar", { name: "Apellidos", length: 100 })
  apellidos: string;

  @Column("varchar", { name: "UserLogin", length: 50 })
  userLogin: string;

  @Column("varchar", { name: "PasswordLogin", nullable: true, length: 130 })
  passwordLogin: string | null;

  @Column("varchar", { name: "Correo", nullable: true, length: 100 })
  correo: string | null;

  @Column("varchar", { name: "Telefono", nullable: true, length: 15 })
  telefono: string | null;

  @Column("bit", { name: "Estado" })
  estado: boolean;

  @Column("datetime", { name: "FechaRegistro" })
  fechaRegistro: Date;

  @Column("int", { name: "IdUsuario", nullable: true })
  idUsuario: number | null;

  @OneToMany(
    () => RecoveryPassword,
    (recoveryPassword) => recoveryPassword.idUsuario
  )
  recoveryPasswords: RecoveryPassword[];

  @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.usuarios)
  @JoinColumn([{ name: "IdTipoUsuario", referencedColumnName: "id" }])
  idTipoUsuario: TipoUsuario;
}

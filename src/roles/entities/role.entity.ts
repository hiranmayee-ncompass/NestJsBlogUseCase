// role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  roleid: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  rolename: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

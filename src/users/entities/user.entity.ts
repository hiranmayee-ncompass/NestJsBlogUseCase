// Import necessary modules and decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from "../../roles/entities/role.entity";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    userid: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleid' })
    role: Role;

    @Column({ default: 3 })
    roleid: number;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        // Set default role when creating a new User entity
        this.roleid = 3;
    }
}

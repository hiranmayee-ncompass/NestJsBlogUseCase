// Import necessary modules and decorators from TypeORM
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('topic')
export class Topic {
    @PrimaryGeneratedColumn()
    topicId: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    topicName: string;

    @Column()
    description: string;

    @Column()
    ownerId: number;

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}

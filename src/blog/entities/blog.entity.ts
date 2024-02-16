import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')
export class blogs {
    @PrimaryGeneratedColumn()
    blogid: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({ type: 'varchar', length: 255})
    header: string;
    
    @Column({ type: 'text'})
    body: string;

    @Column({ type: 'text'})
    footer: string;

    /* @ManyToOne(() => Topic)
    @JoinColumn({ name: 'topicid' })
    topic: Topic; */

}

import { Topic } from 'src/topics/entities/topics.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('blog')
export class Blog {
    @PrimaryGeneratedColumn()
    blogId: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    blogName: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column()
    ownerId: number;

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

    @Column()
    topicId: number;

    @ManyToOne(() => Topic, { nullable: false })
    @JoinColumn({ name: 'topicId' })
    topic: Topic;
}

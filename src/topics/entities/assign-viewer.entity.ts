import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity('assign_viewer')
@Unique(['topicId', 'userId'])
export class AssignViewer {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    topicId: number;

    @Column()
    userId: number;
}
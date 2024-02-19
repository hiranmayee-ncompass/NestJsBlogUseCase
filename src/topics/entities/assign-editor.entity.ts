import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity('assign_editor')
@Unique(['topicId', 'userId'])
export class AssignEditor {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    topicId: number;

    @Column()
    userId: number;
}
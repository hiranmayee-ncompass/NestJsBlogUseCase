import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity('assign_editor')
@Unique(['topicId', 'editorId'])
export class AssignEditor {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    topicId: number;

    @Column()
    editorId: number;
}
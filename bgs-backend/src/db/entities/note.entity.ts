import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity('notes')
export class NoteEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'content', nullable: false})
    public content: string

    @Column({name: 'project_id', type: 'int', nullable: true})
    public project_id: number

    @ManyToOne(() => ProjectEntity, (project) => project.notes, {onDelete: 'CASCADE'})
    @JoinColumn({name: "project_id"})
    project: ProjectEntity
}

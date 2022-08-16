import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity('bills')
export class BillEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'from', nullable: false})
    public from: string
  
    @Column({name: 'to', nullable: false})
    public to: string

    @Column({name: 'amount', type: 'int', nullable: false})
    public amount: number

    @Column({name: 'paid', type: 'bool', nullable: false, default: false})
    public paid: boolean

    @Column({name: 'project_id', type: 'int', nullable: true})
    public project_id: number

    @ManyToOne(() => ProjectEntity, (project) => project.bills, {onDelete: 'CASCADE'})
    @JoinColumn({name: "project_id"})
    project: ProjectEntity
}

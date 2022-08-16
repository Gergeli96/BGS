import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BillEntity } from "./bill.entity";
import { NoteEntity } from "./note.entity";

@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', nullable: false})
    public name: string
  
    @Column({name: 'customername', nullable: false})
    public customer: string
    
    @Column({name: 'customeradresse', nullable: false})
    public customeradresse: string
    
    @Column({name: 'customerphone', nullable: false})
    public customerphone: string
    
    @Column({name: 'deadline', type: 'datetime', nullable: true})
    public deadline: string

    @OneToMany(() => BillEntity, (bill) => bill.project)
    bills: BillEntity[]

    @OneToMany(() => NoteEntity, (note) => note.project)
    notes: NoteEntity[]
}

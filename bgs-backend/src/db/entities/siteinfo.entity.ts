import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('siteinfo')
export class SiteInfoEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', nullable: false})
    public name: string

    @Column({name: 'value', type: 'varchar', nullable: true})
    public value: string
}

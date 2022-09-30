import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WebshopElementGroupEntity } from "./webshop-element-group.entity";
import { WebshopFileEntity } from "./webshop-file.entity";

@Entity('webshopelements')
export class WebshopElementEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', nullable: false})
    public name: string
  
    @Column({name: 'price', type: 'int', nullable: false})
    public price: number
  
    @Column({name: 'group_id', type: 'int', nullable: false})
    public groupid: number

    @Column({name: 'description', type: 'tinytext', nullable: false})
    public description: string

    @OneToMany(() => WebshopFileEntity, (file) => file.webshopelement)
    public files: WebshopFileEntity[]

    @ManyToOne(() => WebshopElementGroupEntity, (group) => group.elements, {onDelete: 'CASCADE'})
    @JoinColumn({name: "group_id"})
    public elementgroup: WebshopElementGroupEntity
}

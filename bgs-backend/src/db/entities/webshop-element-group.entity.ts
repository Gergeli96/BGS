import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WebshopElementEntity } from "./webshop-element.entity";

@Entity('webshopelementgroups')
export class WebshopElementGroupEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', nullable: false})
    public name: string
  
    @Column({name: 'price', type: 'int', nullable: false})
    public price: number

    @Column({name: 'description', type: 'tinytext', nullable: false})
    public description: string

    @OneToMany(() => WebshopElementEntity, (element) => element.elementgroup)
    public elements: WebshopElementEntity[]
}

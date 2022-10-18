import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WebshopItemEntity } from "./webshop-item.entity";

@Entity('webshopitemgroups')
export class WebshopItemGroupEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', nullable: false})
    public name: string
  
    @Column({name: 'price', type: 'int', nullable: false})
    public price: number

    @Column({name: 'description', type: 'tinytext', nullable: false})
    public description: string

    @OneToMany(() => WebshopItemEntity, (element) => element.elementgroup)
    public elements: WebshopItemEntity[]
}

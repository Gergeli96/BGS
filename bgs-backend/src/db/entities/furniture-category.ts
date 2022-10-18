import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WebshopItemEntity } from "./webshop-item.entity";

@Entity('furniturecategories')
export class FurnitureCategoryEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', length: 60, nullable: false})
    public name: string

    @OneToMany(() => WebshopItemEntity, (element) => element.category)
    public elements: WebshopItemEntity[]
}

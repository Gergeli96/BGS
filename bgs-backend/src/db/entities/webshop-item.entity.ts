import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WebshopItemGroupEntity } from "./webshop-item-group.entity";
import { FurnitureCategoryEntity } from "./furniture-category";
import { WebshopFileEntity } from "./webshop-file.entity";

@Entity('webshopitems')
export class WebshopItemEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', nullable: false})
    public name: string
  
    @Column({name: 'design', type: 'varchar', nullable: true})
    public design: string
  
    @Column({name: 'price', type: 'int', nullable: false})
    public price: number
  
    @Column({name: 'group_id', type: 'int', nullable: false})
    public groupid: number
  
    @Column({name: 'category_id', type: 'int', nullable: false})
    public categoryid: number

    @Column({name: 'description', type: 'text', nullable: false})
    public description: string

    @OneToMany(() => WebshopFileEntity, (file) => file.webshopelement)
    public files: WebshopFileEntity[]

    @ManyToOne(() => WebshopItemGroupEntity, (group) => group.elements, {onDelete: 'CASCADE'})
    @JoinColumn({name: "group_id"})
    public elementgroup: WebshopItemGroupEntity

    @ManyToOne(() => FurnitureCategoryEntity, (category) => category.elements, {onDelete: 'CASCADE'})
    @JoinColumn({name: "category_id"})
    public category: FurnitureCategoryEntity
}

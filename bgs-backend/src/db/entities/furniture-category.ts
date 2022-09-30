import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('furniturecategories')
export class FurnitureCategoryEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', type: 'varchar', length: 60, nullable: false})
    public name: string
}

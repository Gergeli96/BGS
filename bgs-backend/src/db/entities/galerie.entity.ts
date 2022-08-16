import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GaleryFileEntity } from "./galerie-files.entity";

@Entity('galeries')
export class GaleryEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'name', nullable: false})
    public name: string

    @Column({name: 'description', type: 'varchar', nullable: true})
    public description: string

    @OneToMany(() => GaleryFileEntity, (file) => file.galery)
    files: GaleryFileEntity[]
}

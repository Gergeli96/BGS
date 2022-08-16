import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GaleryEntity } from "./galerie.entity";

@Entity('galeriefiles')
export class GaleryFileEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'fileid', type: 'varchar', nullable: false})
    public fileid: string

    @Column({name: 'galery_id', type: 'int', nullable: true})
    public galery_id: number

    @ManyToOne(() => GaleryEntity, (galery) => galery.files, {onDelete: 'CASCADE'})
    @JoinColumn({name: "galery_id"})
    galery: GaleryEntity
}

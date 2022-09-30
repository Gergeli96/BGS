import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WebshopElementEntity } from "./webshop-element.entity";

@Entity('webshopfiles')
export class WebshopFileEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'fileid', type: 'varchar', nullable: false})
    public fileid: string

    @Column({name: 'webshopelement_id', type: 'int', nullable: true})
    public webshopelementid: number

    @ManyToOne(() => WebshopElementEntity, (galery) => galery.files, {onDelete: 'CASCADE'})
    @JoinColumn({name: "webshopelement_id"})
    public webshopelement: WebshopElementEntity
}

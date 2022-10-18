import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WebshopItemEntity } from "./webshop-item.entity";

@Entity('webshopfiles')
export class WebshopFileEntity {
    @PrimaryGeneratedColumn()
    public id: number
  
    @Column({name: 'fileid', type: 'varchar', nullable: false})
    public fileid: string

    @Column({name: 'webshopelement_id', type: 'int', nullable: true})
    public webshopelementid: number

    @ManyToOne(() => WebshopItemEntity, (galery) => galery.files, {onDelete: 'CASCADE'})
    @JoinColumn({name: "webshopelement_id"})
    public webshopelement: WebshopItemEntity
}

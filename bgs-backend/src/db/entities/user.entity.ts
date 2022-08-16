import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {  
    @PrimaryGeneratedColumn()
    public id: number

    @Column({type: 'varchar', nullable: false, unique: true}) 
    public username: string

    @Column({type: 'varchar', nullable: false}) 
    public password: string

    @Column({type: 'varchar', nullable: false}) 
    public email: string

    @BeforeInsert()
    public async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}

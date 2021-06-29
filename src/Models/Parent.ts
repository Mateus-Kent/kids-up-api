import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('parents')
class Parent {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 username: string;

 @Column()
 email: string;

 @Column()
 phone_number: string;

 @Column()
 password: string;

 @Column()
 profile_photo: string;

 @BeforeInsert()
 @BeforeUpdate()
 hashPassword(){
  this.password = bcrypt.hashSync(this.password, 8);
 }
}

export default Parent;
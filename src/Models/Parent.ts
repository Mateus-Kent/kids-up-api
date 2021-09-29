import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne } from 'typeorm';
import bcrypt from 'bcryptjs';
import Message from './Message'

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

 @OneToMany(type => Message, parent => Parent)
 messages: Message[];

 @Column()
 isCaregiver: boolean;


 @BeforeInsert()
 @BeforeUpdate()
 hashPassword() {
  this.password = bcrypt.hashSync(this.password, 8);
 }
}

export default Parent;
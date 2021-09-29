import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne } from 'typeorm';
import bcrypt from 'bcryptjs';
import Message from './Message'

@Entity('users')
class User {
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

 @OneToMany(type => Message, user => User)
 messages: Message[];

 @Column()
 isCaregiver: boolean;


 @BeforeInsert()
 @BeforeUpdate()
 hashPassword() {
  this.password = bcrypt.hashSync(this.password, 8);
 }
}

export default User;
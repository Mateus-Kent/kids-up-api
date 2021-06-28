import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export default Parent;
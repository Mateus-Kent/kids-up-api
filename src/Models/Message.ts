import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import  User  from './User'

@Entity('messages')
class Message {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 MessageText: string;

 @Column()
 send_at: Date;

 @ManyToOne(type => User , message => Message)
 messenger: User;

 @ManyToOne(type => User ,  message => Message)
 receiver: User;

 @Column()
 isViewed: boolean;
}

export default Message;
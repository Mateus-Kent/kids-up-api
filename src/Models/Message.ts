import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import  Parent  from './Parent'

@Entity('messages')
class Message {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 MessageText: string;

 @Column()
 send_at: Date;

 @ManyToOne(type => Parent , message => Message)
 messenger: Parent;

 @ManyToOne(type => Parent ,  message => Message)
 receiver: Parent;

 @Column()
 isViewed: boolean;
}

export default Message;